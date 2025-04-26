import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import { useGetLadderMutation } from "../../../redux/features/events/events";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import BetSlip from "./BetSlip";
import Ladder from "../../modals/Ladder";

const Fancy = ({ data }) => {
  const navigate = useNavigate();
  const fancyData = data?.filter(
    (fancy) =>
      fancy.btype === "FANCY" &&
      fancy.tabGroupName === "Normal" &&
      fancy?.visible == true
  );
  const [marketName, setMarketName] = useState("");
  const [ladderData, setLadderData] = useState([]);
  const { eventId } = useParams();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { runnerId } = useSelector((state) => state.event);
  const { data: exposure } = useExposure(eventId);
  const [getLadder] = useGetLadderMutation();

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
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === runner?.id);
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
          }
        });
      } else {
        selectionId = runner?.selectionId;
        eventTypeId = games?.marketId;
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find(
            (p) => p?.RunnerId === runner?.selectionId
          );
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
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
        pnl: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
      };
      if (games?.btype == "FANCY") {
        dispatch(setRunnerId(games?.id));
      } else if (games?.btype && games?.btype !== "FANCY") {
        dispatch(setRunnerId(runner?.id));
      } else {
        dispatch(setRunnerId(runner?.selectionId));
      }

      dispatch(setPlaceBetValues(betData));
    } else {
      navigate("/login");
    }
  };

  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  const handleGetLadder = async (pnl, marketName) => {
    if (!pnl?.MarketId) {
      return;
    }
    setMarketName(marketName);
    const res = await getLadder({ marketId: pnl?.MarketId }).unwrap();

    if (res.success) {
      setLadderData(res.result);
    }
  };

  return (
    <>
      {ladderData?.length > 0 && (
        <Ladder
          setLadderData={setLadderData}
          ladderData={ladderData}
          marketName={marketName}
        />
      )}
      {fancyData?.length > 0 && (
        <div className="bets-wrap fancy_bet">
          <p className="no_bet" style={{ display: "none" }}>
            has no markets
          </p>
          <table className="bets" style={{ fontSize: "12px" }} width={280}>
            <colgroup>
              <col span={1} width={70} />
              <col span={1} width={70} />
              <col span={1} width={70} />
              <col span={1} width={70} />
              <col span={1} width={70} />
              <col span={1} width={70} />
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
              <tr id="fancyBetSpecialBet" className="special_bet">
                <td colSpan={7}>
                  <h3>
                    <a className="add-pin">Add Pin</a>
                    Fancy Bet
                  </h3>
                </td>
              </tr>
              <tr className="bet-all">
                <td />
                <td className="refer-bet" colSpan={2} />
                <td>No</td>
                <td>Yes</td>
                <td className="refer-book" colSpan={2} />
              </tr>
              {fancyData?.map((game) => {
                const pnl =
                  pnlBySelection?.find((pnl) => pnl?.MarketId === game?.id) ||
                  {};

                return (
                  <>
                    <tr>
                      <th style={{ height: "auto" }} colSpan={3}>
                        <dl
                          className="fancy-th-layout"
                          style={{ height: "auto" }}
                        >
                          <dt>
                            <p>{game?.name}</p>
                            {pnl?.pnl && (
                              <p
                                id="before"
                                className={`${pnl?.pnl > 0 ? "win" : "lose"}`}
                              >
                                <span
                                  className={`${
                                    pnl?.pnl > 0 ? "green" : "red"
                                  }`}
                                >
                                  ({pnl?.pnl})
                                </span>
                              </p>
                            )}
                          </dt>
                          {pnl?.pnl && (
                            <dd className="dd-tips">
                              <ul className="fancy-tips"></ul>
                              <a
                                onClick={() => handleGetLadder(pnl, game?.name)}
                                id="fancyBetBookBtn"
                                className="btn-book"
                              >
                                Book
                              </a>
                            </dd>
                          )}
                        </dl>
                      </th>
                      <td colSpan={2} className="multi_select ">
                        <ul style={{ borderBottom: "none" }}>
                          <li
                            style={{ height: "42px" }}
                            onClick={() =>
                              handleBetSlip(
                                "lay",
                                game,
                                game?.runners?.[0],
                                game?.runners?.[0]?.lay?.[0]?.line
                              )
                            }
                            className="lay-1"
                            id="lay_1"
                          >
                            <a
                              id="runsInfo"
                              style={{ cursor: "pointer", height: "auto" }}
                            >
                              {game?.runners?.[0]?.lay?.[0]?.line}
                              <span>{game?.runners?.[0]?.lay?.[0]?.price}</span>
                            </a>
                          </li>
                          <li
                            style={{ height: "42px" }}
                            onClick={() =>
                              handleBetSlip(
                                "back",
                                game,
                                game?.runners?.[0],
                                game?.runners?.[0]?.back?.[0]?.line
                              )
                            }
                            className="back-1"
                          >
                            <a style={{ cursor: "pointer", height: "auto" }}>
                              {game?.runners?.[0]?.back?.[0]?.line}
                              <span>
                                {game?.runners?.[0]?.back?.[0]?.price}
                              </span>
                            </a>
                          </li>
                        </ul>
                      </td>
                      <td className="td-fancy_merge" colSpan={2}>
                        <dl className="fancy-info">
                          <dt>Min/Max</dt>
                          <dd id="minMax"> 100 / {game?.maxLiabilityPerBet}</dd>
                        </dl>
                      </td>
                    </tr>
                    {runnerId === game?.id && <BetSlip />}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Fancy;
