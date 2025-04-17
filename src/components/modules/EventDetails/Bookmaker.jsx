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

const Bookmaker = ({ data }) => {
  const filterBookmaker = data?.filter(
    (game) => game.btype === "BOOKMAKER" && game?.visible == true
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
      filterBookmaker?.length > 0 &&
      exposure?.pnlBySelection &&
      Object.keys(exposure?.pnlBySelection)?.length > 0
    ) {
      filterBookmaker.forEach((game) => {
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
      {filterBookmaker?.length > 0 &&
        filterBookmaker?.map((game) => {
          const teamProfitForGame = teamProfit?.find(
            (profit) =>
              profit?.gameId === game?.id && profit?.isOnePositiveExposure
          );

          return (
            <div key={game?.id} className="bets-wrap bookmaker_bet">
              <div className="multi-pin-title">
                <h3>
                  <a className="add-pin" title="Add to Multi Markets"></a>
                  <strong>{game?.name?.toUpperCase()}</strong>
                </h3>
              </div>
              <table
                id="bookMakerMarketList"
                className="bets bets-bookmaker"
                style={{ fontSize: "12px" }}
              >
                <colgroup>
                  <col span={1} width={280} />
                  <col span={6} width={70} />
                </colgroup>
                <tbody>
                  <tr className="colgroup-adjust">
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr className="bet-all">
                    <td colSpan={3} />

                    <td>Back</td>
                    <td>Lay</td>
                    <td className="refer-book" colSpan={2} />
                  </tr>
                </tbody>
                <tbody style={{ display: "table-row-group" }}>
                  <tr className="market-more add-info">
                    <td colSpan={7}>
                      <h3 id="market-name" className>
                        Bookmaker
                      </h3>
                      <ul className="bookmaker-info">
                        <li>
                          <span>Min</span>
                          <data id="min"> 100.00</data>
                        </li>
                        <li>
                          <span>Max</span>
                          <data id="max"> 62,500.00</data>
                        </li>
                        <li id="rebate" style={{ display: "none" }}>
                          <span>Rebate</span>
                          <data id="rebate-val" />
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr
                    id="bookMakerSuspend_34213127_265456_782186"
                    className="fancy-suspend-tr"
                    style={{ display: "none" }}
                  >
                    <th colSpan />
                    <td className="fancy-suspend-td" colSpan={6}>
                      <div id="suspendClass" className>
                        <span id="info">Suspend</span>
                      </div>
                    </td>
                  </tr>
                  {game?.runners?.map((runner) => {
                    return (
                      <>
                        <tr
                          key={runner?.id}
                          id="bookMakerSelection_34213127_265456_782186"
                          style={{ display: "table-row" }}
                        >
                          <th className="predict">
                            <p id="runnerName">{runner?.name}</p>
                          </th>
                          <td className colSpan={3}>
                            <dl className="back-gradient">
                              <dd
                                onClick={() =>
                                  handleBetSlip(
                                    "back",
                                    game,
                                    runner,
                                    runner?.back?.[2]?.price
                                  )
                                }
                                id="back_3"
                                style={{ cursor: "pointer" }}
                              >
                                <p>{runner?.back?.[2]?.price}</p>
                              </dd>
                              <dd
                                onClick={() =>
                                  handleBetSlip(
                                    "back",
                                    game,
                                    runner,
                                    runner?.back?.[1]?.price
                                  )
                                }
                                id="back_2"
                                style={{ cursor: "pointer" }}
                              >
                                <p>{runner?.back?.[1]?.price}</p>
                              </dd>
                              <dd
                                onClick={() =>
                                  handleBetSlip(
                                    "back",
                                    game,
                                    runner,
                                    runner?.back?.[0]?.price
                                  )
                                }
                                id="back_1"
                                className="select"
                                style={{ cursor: "pointer" }}
                              >
                                <a>{runner?.back?.[0]?.price}</a>
                              </dd>
                            </dl>
                          </td>
                          <td className colSpan={3}>
                            <dl className="lay-gradient">
                              <dd
                                onClick={() =>
                                  handleBetSlip(
                                    "lay",
                                    game,
                                    runner,
                                    runner?.lay?.[0]?.price
                                  )
                                }
                                className
                                id="lay_1"
                                style={{ cursor: "pointer" }}
                              >
                                <a>{runner?.lay?.[0]?.price}</a>
                              </dd>
                              <dd
                                onClick={() =>
                                  handleBetSlip(
                                    "lay",
                                    game,
                                    runner,
                                    runner?.lay?.[1]?.price
                                  )
                                }
                                id="lay_2"
                                style={{ cursor: "pointer" }}
                              >
                                <p>{runner?.lay?.[1]?.price}</p>
                              </dd>
                              <dd
                                onClick={() =>
                                  handleBetSlip(
                                    "lay",
                                    game,
                                    runner,
                                    runner?.lay?.[2]?.price
                                  )
                                }
                                id="lay_3"
                                style={{ cursor: "pointer" }}
                              >
                                <p>{runner?.lay?.[2]?.price}</p>
                              </dd>
                            </dl>
                          </td>
                        </tr>

                        {runner?.id == runnerId && <BetSlip />}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
    </>
  );
};

export default Bookmaker;
