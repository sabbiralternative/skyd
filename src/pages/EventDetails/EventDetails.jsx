import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetEventDetailsQuery } from "../../redux/features/events/events";
import { setPredictOdd } from "../../redux/features/events/eventSlice";
import Bookmaker from "../../components/modules/EventDetails/Bookmaker";
import Fancy from "../../components/modules/EventDetails/Fancy";
import MatchOdds from "../../components/modules/EventDetails/MatchOdds";

import { Settings } from "../../api";
import { useAccessToken } from "../../hooks/accessToken";
import LeftSidebar from "../../components/shared/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/shared/RightSidebar/RightSidebar";
import Notification from "../../components/shared/Header/Notification";
import ScoreCard from "../../components/modules/EventDetails/ScoreCard";

const EventDetails = () => {
  const { eventTypeId, eventId } = useParams();
  const [profit, setProfit] = useState(0);
  const dispatch = useDispatch();
  const { placeBetValues, price, stake } = useSelector((state) => state.event);

  const { data } = useGetEventDetailsQuery(
    { eventTypeId, eventId },
    {
      pollingInterval: 1000,
    }
  );
  const payload = {
    eventTypeId: eventTypeId,
    eventId: eventId,
    type: "video",
    casinoCurrency: Settings.casinoCurrency,
  };
  const { data: video } = useAccessToken(payload, data?.score?.hasVideo);
  useEffect(() => {
    if (
      price &&
      stake &&
      placeBetValues?.back &&
      placeBetValues?.btype === "MATCH_ODDS"
    ) {
      const multiply = price * stake;
      setProfit(formatNumber(multiply - stake));
    } else if (
      price &&
      stake &&
      placeBetValues?.back &&
      (placeBetValues?.btype === "BOOKMAKER" ||
        placeBetValues?.btype === "BOOKMAKER2")
    ) {
      setProfit(formatNumber(1 + price / stake));
    }
  }, [price, stake, profit, placeBetValues, setProfit]);

  useEffect(() => {
    let total;
    if (
      placeBetValues?.btype === "MATCH_ODDS" ||
      placeBetValues?.btype === "BOOKMAKER"
    ) {
      if (placeBetValues?.back) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = price * stake - stake;
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = bookmaker * stake - stake;
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(exp?.exposure + -1 * stake),

              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });

          dispatch(setPredictOdd(currentExposure));
        }
      } else if (placeBetValues?.lay) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = -1 * (price * stake - stake);
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = -1 * (bookmaker * stake - stake);
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(1 * exp?.exposure + 1 * stake),
              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });
          dispatch(setPredictOdd(currentExposure));
        }
      }
    }
  }, [price, stake, placeBetValues, dispatch]);

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    // value?.toFixed(2)
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };

  //   const match_odds = data?.result?.filter(
  //     (match_odd) =>
  //       match_odd.btype === "MATCH_ODDS" && match_odd?.visible == true
  //   );

  return (
    <div className="full-wrap">
      <LeftSidebar />
      <div id="centerColumn" className="col-center markets">
        <Notification />

        {/* Game Head */}
        <div id="gameHead" className="game-head" style={{}}>
          <table
            id="gameTeam"
            className="game-team"
            style={{ display: "table" }}
          >
            <tbody>
              <tr id="twoTeam" style={{}}>
                <td id="gameVisit" className="game-visit">
                  {data?.result?.[0]?.eventName}
                  <span />
                </td>
                {/* <td id="gameVs" className="game-vs">
                  <div>
                    Match Odds<span>v</span>
                  </div>
                </td> */}
                <td id="gameHome" className="game-home">
                  {data?.result?.[0]?.openDate}
                  <span />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="game-info-wrap">
            {/* Game Information */}
            {/* <ul className="game-info" style={{ display: "block" }}>
              <li id="gameInfoDate">
                <img className="icon-time" src="images/transparent.gif" /> Tue
                15 Apr, 19:30
              </li>
            </ul> */}

            {/* <dl id="minMaxBox" className="fancy-info" style={{}}>
              <dt id="minMaxDt" style={{}}>
                Min/Max
              </dt>
              <dt id="maxDt" style={{ display: "none" }}>
                Max
              </dt>
              <dd id="minMaxInfo">100 / 312500</dd>
            </dl> */}

            {/* <dl className="game-matched" style={{ display: "block" }}>
              <dt id="gameMatchedName">Matched</dt>
              <dd id="gameMatched">IR 138,592,058</dd>
            </dl> */}
          </div>
        </div>
        <div
          id="overWrap"
          className="over-wrap live-match"
          style={{ height: "calc(100% - 94px)" }}
        >
          {eventTypeId == 4 &&
            data?.result?.[0]?.score2?.length !== 0 &&
            !Array.isArray(data?.result?.[0]?.score2) && (
              <ScoreCard score2={data?.result?.[0]?.score2} />
            )}
          {data?.result?.length > 0 && <MatchOdds data={data?.result} />}
          {data?.result?.length > 0 && <Bookmaker data={data?.result} />}
          {data?.result?.length > 0 && <Fancy data={data?.result} />}
        </div>
      </div>

      <RightSidebar />
    </div>
  );
};

export default EventDetails;
