import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import BetSlip from "./BetSlip";
import isOddSuspended from "../../../utils/isOddSuspended";

const MatchOdds = ({ data }) => {
  const filterMatchOdds = data?.filter(
    (game) => game.btype === "MATCH_ODDS" && game?.visible == true
  );
  const { eventId } = useParams();
  const [teamProfit, setTeamProfit] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { runnerId, stake, predictOdd } = useSelector((state) => state.event);
  const { token } = useSelector((state) => state.auth);
  const { data: exposure } = useExposure(eventId);

  const handleBetSlip = (betType, games, runner, price) => {
    if (token) {
      let selectionId;
      let runnerId;
      let eventTypeId;
      if (!price) {
        return;
      }

      let pnlBySelection;
      const updatedPnl = [];

      if (exposure?.pnlBySelection) {
        const obj = exposure?.pnlBySelection;
        pnlBySelection = Object?.values(obj);
      }

      if (games?.btype == "FANCY") {
        selectionId = games?.id;
        runnerId = games?.id;
        eventTypeId = games?.eventTypeId;
      } else if (games?.btype && games?.btype !== "FANCY") {
        selectionId = runner?.id;
        runnerId = games.runners.map((runner) => runner.id);
        eventTypeId = games?.eventTypeId;
        games?.runners?.forEach((rnr) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === rnr?.id);
          if (pnl) {
            updatedPnl.push({
              exposure: pnl?.pnl,
              id: pnl?.RunnerId,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
          } else {
            updatedPnl.push({
              exposure: 0,
              id: rnr?.id,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
          }
        });
      }

      const betData = {
        price,
        side: betType === "back" ? 0 : 1,
        selectionId,
        btype: games?.btype,
        eventTypeId,
        betDelay: games?.betDelay,
        marketId: games?.id,
        lay: betType === "lay",
        back: betType === "back",
        selectedBetName: runner?.name,
        name: games.runners.map((runner) => runner.name),
        runnerId,
        isWeak: games?.isWeak,
        maxLiabilityPerMarket: games?.maxLiabilityPerMarket,
        isBettable: games?.isBettable,
        maxLiabilityPerBet: games?.maxLiabilityPerBet,
        exposure: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
      };
      dispatch(setRunnerId(runner?.id));
      dispatch(setPlaceBetValues(betData));
    } else {
      navigate("/login");
    }
  };

  const computeExposureAndStake = (
    exposureA,
    exposureB,
    runner1,
    runner2,
    gameId
  ) => {
    let runner, largerExposure, layValue, oppositeLayValue, lowerExposure;

    const pnlArr = [exposureA, exposureB];
    const isOnePositiveExposure = onlyOnePositive(pnlArr);

    if (exposureA > exposureB) {
      // Team A has a larger exposure.
      runner = runner1;
      largerExposure = exposureA;
      layValue = runner1?.lay?.[0]?.price;
      oppositeLayValue = runner2?.lay?.[0]?.price;
      lowerExposure = exposureB;
    } else {
      // Team B has a larger exposure.
      runner = runner2;
      largerExposure = exposureB;
      layValue = runner2?.lay?.[0]?.price;
      oppositeLayValue = runner1?.lay?.[0]?.price;
      lowerExposure = exposureA;
    }

    // Compute the absolute value of the lower exposure.
    let absLowerExposure = Math.abs(lowerExposure);

    // Compute the liability for the team with the initially larger exposure.
    let liability = absLowerExposure * (layValue - 1);

    // Compute the new exposure of the team with the initially larger exposure.
    let newExposure = largerExposure - liability;

    // Compute the profit using the new exposure and the lay odds of the opposite team.
    let profit = newExposure / layValue;

    // Calculate the new stake value for the opposite team by adding profit to the absolute value of its exposure.
    let newStakeValue = absLowerExposure + profit;

    // Return the results.
    return {
      runner,
      newExposure,
      profit,
      newStakeValue,
      oppositeLayValue,
      gameId,
      isOnePositiveExposure,
    };
  };
  function onlyOnePositive(arr) {
    let positiveCount = arr?.filter((num) => num > 0).length;
    return positiveCount === 1;
  }
  useEffect(() => {
    let results = [];
    if (
      filterMatchOdds?.length > 0 &&
      exposure?.pnlBySelection &&
      Object.keys(exposure?.pnlBySelection)?.length > 0
    ) {
      filterMatchOdds.forEach((game) => {
        const runners = game?.runners || [];
        if (runners?.length === 2) {
          const runner1 = runners[0];
          const runner2 = runners[1];
          const pnl1 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner1?.id
          )?.pnl;
          const pnl2 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner2?.id
          )?.pnl;

          if (pnl1 && pnl2 && runner1 && runner2) {
            const result = computeExposureAndStake(
              pnl1,
              pnl2,
              runner1,
              runner2,
              game?.id
            );
            results.push(result);
          }
        }
      });
      setTeamProfit(results);
    } else {
      setTeamProfit([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, data]);

  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  return (
    <>
      {filterMatchOdds?.length > 0 &&
        filterMatchOdds?.map((game) => {
          const teamProfitForGame = teamProfit?.find(
            (profit) =>
              profit?.gameId === game?.id && profit?.isOnePositiveExposure
          );

          return (
            <>
              <div id="bookMakerSpecialBet" className="multi-pin-title">
                <h3>
                  <a
                    id="multiMarketPin"
                    className="add-pin"
                    title="Add to Multi Markets"
                  ></a>
                  <strong>{game?.name?.toUpperCase()}</strong>
                </h3>
              </div>
              <div
                style={{ marginTop: "20px" }}
                key={game?.id}
                id="fullMarketBetsWrap"
                className="bets-wrap asiahadicap"
              >
                <table
                  id="fullMarketBoard"
                  className={`bets ${
                    game?.status === "OPEN" ? "" : "disabled"
                  }`}
                  style={{ fontSize: "12px" }}
                >
                  <tbody>
                    <tr className="bet-all">
                      <td />
                      <td
                        id="backPercent"
                        className="refer-bet"
                        colSpan={2}
                      ></td>
                      <td>
                        <a id="backAll" className="back-all">
                          <img src="/images/transparent.gif" />
                          <span>Back</span>
                        </a>
                      </td>
                      <td>
                        <a id="layAll" className="lay-all">
                          <img src="/images/transparent.gif" />
                          <span>Lay</span>
                        </a>
                      </td>
                      <td id="layPercent" className="refer-book" colSpan={2}>
                        {"'"}
                      </td>
                    </tr>
                    {game?.runners?.map((runner) => {
                      return (
                        <>
                          <tr key={runner?.id} style={{ display: "table-row" }}>
                            <th className>
                              <p>
                                <a>
                                  <img
                                    className="icon-predict"
                                    src="/images/transparent.gif"
                                  />
                                </a>
                                {runner?.name}
                              </p>
                            </th>
                            <td
                              id="suspend"
                              colSpan={6}
                              className="suspend"
                              style={{ display: "none" }}
                            >
                              <span>Suspend</span>
                            </td>

                            <td
                              onClick={() =>
                                handleBetSlip(
                                  "back",
                                  game,
                                  runner,
                                  runner?.back?.[2]?.price
                                )
                              }
                              id="back_3"
                              className="back-3"
                            >
                              <a>
                                {runner?.back?.[2]?.price}
                                <span>{runner?.back?.[2]?.size}</span>
                              </a>
                            </td>
                            <td
                              onClick={() =>
                                handleBetSlip(
                                  "back",
                                  game,
                                  runner,
                                  runner?.back?.[1]?.price
                                )
                              }
                              id="back_2"
                              className="back-2"
                            >
                              <a>
                                {runner?.back?.[1]?.price}
                                <span>{runner?.back?.[1]?.size}</span>
                              </a>
                            </td>
                            <td
                              onClick={() =>
                                handleBetSlip(
                                  "back",
                                  game,
                                  runner,
                                  runner?.back?.[0]?.price
                                )
                              }
                              id="back_1"
                              className="back-1"
                            >
                              <a>
                                {runner?.back?.[0]?.price}
                                <span>{runner?.back?.[0]?.size}</span>
                              </a>
                            </td>
                            <td
                              onClick={() =>
                                handleBetSlip(
                                  "lay",
                                  game,
                                  runner,
                                  runner?.lay?.[0]?.price
                                )
                              }
                              id="lay_1"
                              className="lay-1"
                            >
                              <a>
                                {runner?.lay?.[0]?.price}
                                <span>{runner?.lay?.[0]?.size}</span>
                              </a>
                            </td>
                            <td
                              onClick={() =>
                                handleBetSlip(
                                  "lay",
                                  game,
                                  runner,
                                  runner?.lay?.[1]?.price
                                )
                              }
                              id="lay_2"
                              className="lay-2"
                            >
                              <a>
                                {runner?.lay?.[1]?.price}
                                <span>{runner?.lay?.[1]?.size}</span>
                              </a>
                            </td>
                            <td
                              onClick={() =>
                                handleBetSlip(
                                  "lay",
                                  game,
                                  runner,
                                  runner?.lay?.[2]?.price
                                )
                              }
                              id="lay_3"
                              className="lay-3"
                            >
                              <a>
                                {runner?.lay?.[2]?.price}
                                <span>{runner?.lay?.[2]?.size}</span>
                              </a>
                            </td>
                          </tr>
                          {runner?.id == runnerId && <BetSlip />}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          );
        })}
    </>
  );
};

export default MatchOdds;
