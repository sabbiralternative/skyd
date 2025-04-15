import { useGroupQuery } from "../../redux/features/events/events";
import Footer from "../../components/shared/Footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../../components/shared/Header/Notification";

const Sports = () => {
  const { group } = useParams();
  const { data } = useGroupQuery(
    { sportsType: group },
    {
      pollingInterval: 1000,
    }
  );

  const [categories, setCategories] = useState([]);
  const eventName = { 4: "Cricket", 2: "Tennis", 1: "Football" };
  const navigate = useNavigate();
  const navigateGameList = (keys) => {
    navigate(`/event-details/${data[keys]?.eventTypeId}/${keys}`);
  };

  useEffect(() => {
    if (data) {
      const categories = Array.from(
        new Set(
          Object.values(data)
            .filter((item) => item.visible)
            .map((item) => item.eventTypeId)
        )
      );
      const sortedCategories = categories.sort((a, b) => {
        const order = { 4: 0, 1: 1, 2: 2 };
        return order[a] - order[b];
      });
      setCategories(sortedCategories);
    }
  }, [data]);

  return (
    <div className="full-wrap">
      <div id="centerColumn" className="col-center">
        <Notification />

        <div
          id="overWrap"
          className="over-wrap"
          style={{ height: "calc(100% - 26px)" }}
        >
          <div className="kv-wrap" style={{}}>
            <a>
              <img src="/images/kv/skyexchange/kv_cricket.jpg" alt="" />
            </a>
          </div>

          <div
            id="gameHighlightWrap"
            className="game-highlight-wrap col3"
            style={{}}
          >
            <h3>
              Sports Highlights
              <div className="highlight-sorting">
                <label htmlFor="lang">View by</label>
                <div className="select">
                  <select id="viewType" name="View">
                    <option id="competitionName" value="competitionName">
                      Competition
                    </option>
                    <option id="openDateTime" value="openDateTime" selected>
                      Time
                    </option>
                    <option id="totalMatched" value="totalMatched">
                      Matched
                    </option>
                  </select>
                </div>
              </div>
            </h3>

            {categories?.map((category) => {
              const filteredData = Object.entries(data)
                .filter(
                  ([, value]) =>
                    value.eventTypeId === category && value.visible === true
                )
                .reduce((obj, [key, value]) => {
                  obj[key] = value;
                  return obj;
                }, {});
              return (
                <div key={category}>
                  <ul className="slip-head">
                    <li className="col-game" />
                    <li className="col-matched">{eventName[category]}</li>
                    <li className="col-visit">1</li>
                    <li className="col-draw">x</li>
                    <li className="col-home">2</li>
                    <li className="col-info" />
                  </ul>
                  {/* Event Board */}
                  <div className="game-list">
                    {/* <div
                      id="noDataDiv"
                      className="no-data"
                      style={{ display: "none" }}
                    >
                      <p>There are no events to be displayed.</p>
                    </div> */}
                    <div id="eventBoard">
                      {data &&
                        Object.values(data).length > 0 &&
                        Object.keys(filteredData)
                          .sort(
                            (keyA, keyB) => data[keyA].sort - data[keyB].sort
                          )
                          .map((key) => {
                            if (!data?.[key]?.visible) {
                              return null;
                            }

                            return (
                              <dl
                                onClick={() => navigateGameList(key)}
                                key={key}
                                className="game-list-col"
                                style={{ display: "flex" }}
                              >
                                <dt
                                  id="eventInfo"
                                  style={{ cursor: "pointer" }}
                                >
                                  {data?.[key]?.inPlay === 1 && (
                                    <img
                                      id="playIcon"
                                      className="icon-in_play"
                                      src="/images/transparent.gif"
                                    />
                                  )}

                                  <a>{data?.[key]?.eventName}</a>
                                  {data?.[key]?.inPlay === 1 && (
                                    <span
                                      id="dateTimeInfo"
                                      className="game-list-time"
                                    >
                                      <span className="in_play">In-Play</span>
                                    </span>
                                  )}
                                  {data?.[key]?.isTv === 1 && (
                                    <span
                                      className="game-live"
                                      id="streamingIcon"
                                      style={{ display: "inline-flex" }}
                                    >
                                      Live
                                    </span>
                                  )}
                                  {data?.[key]?.isFancy === 1 && (
                                    <span
                                      className="game-fancy in-play"
                                      id="fancyBetIcon"
                                      style={{
                                        cursor: "pointer",
                                        display: "inline-flex",
                                      }}
                                    >
                                      Fancy
                                    </span>
                                  )}
                                  {data?.[key]?.bookmaker === 1 && (
                                    <span
                                      className="game-bookmaker in-play"
                                      id="bookMakerIcon"
                                      style={{
                                        cursor: "pointer",
                                        display: "inline-flex",
                                      }}
                                    >
                                      BookMaker
                                    </span>
                                  )}
                                </dt>
                                <dd id="matched" className="col-matched">
                                  {data?.[key]?.date}
                                </dd>
                                <dd className="col-visit">
                                  <div
                                    className="suspend"
                                    style={{ display: "none" }}
                                    id="suspend_34216770_12152199_0_00"
                                  >
                                    <span>Suspend</span>
                                  </div>
                                  <a id="btnBack" className="btn-back">
                                    {data?.[key]?.[0]?.ex?.availableToBack?.[0]
                                      ?.price | "--"}
                                  </a>{" "}
                                  <a id="btnLay" className="btn-lay">
                                    {data?.[key]?.[0]?.ex?.availableToLay?.[0]
                                      ?.price || "--"}
                                  </a>
                                </dd>
                                <dd className="col-draw" style={{}}>
                                  <div
                                    className="suspend"
                                    style={{ display: "none" }}
                                  >
                                    <span>Suspend</span>
                                  </div>
                                  <a id="btnBack" className="btn-back">
                                    {data?.[key]?.[2]?.ex?.availableToBack?.[0]
                                      ?.price || "--"}
                                  </a>{" "}
                                  <a id="btnLay" className="btn-lay">
                                    {data?.[key]?.[2]?.ex?.availableToLay?.[0]
                                      ?.price || "--"}
                                  </a>
                                </dd>
                                <dd className="col-home">
                                  <div
                                    className="suspend"
                                    style={{ display: "none" }}
                                  >
                                    <span>Suspend</span>
                                  </div>
                                  <a id="btnBack" className="btn-back">
                                    {data?.[key]?.[1]?.ex?.availableToBack?.[0]
                                      ?.price || "--"}
                                  </a>{" "}
                                  <a id="btnLay" className="btn-lay">
                                    {data?.[key]?.[1]?.ex?.availableToLay?.[0]
                                      ?.price || "--"}
                                  </a>
                                </dd>
                              </dl>
                            );
                          })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Sports;
