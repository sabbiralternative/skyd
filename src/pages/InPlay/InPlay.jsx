import { useEffect, useState } from "react";
import { useGroupQuery } from "../../redux/features/events/events";
import { useNavigate } from "react-router-dom";

const InPlay = () => {
  const { data } = useGroupQuery(
    { sportsType: 0 },
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
    <div id="page" role="page">
      <div className="mian-wrap">
        <div className="tab-wrap">
          <ul>
            <li id="inplay" className="select">
              <a>In-Play</a>
            </li>
            <li id="today">
              <a>Today</a>
            </li>
            <li id="tomorrow">
              <a>Tomorrow</a>
            </li>
            <li id="result">
              <a>Result</a>
            </li>
          </ul>
          <a className="a-search">Search</a>
        </div>
        <div className="wrap-highlight_list" id="inPlayData">
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
              <div
                key={category}
                id="inPlayEventType_4"
                style={{ display: "block" }}
              >
                <h3> {eventName[category]}</h3>
                <ul
                  className="highlight-list"
                  style={{ marginBottom: "0px" }}
                  id="inPlayList_4"
                >
                  {data &&
                    Object.values(data).length > 0 &&
                    Object.keys(filteredData)
                      .sort((keyA, keyB) => data[keyA].sort - data[keyB].sort)
                      .map((key) => {
                        if (!data?.[key]?.visible) {
                          return null;
                        }

                        return (
                          <li
                            onClick={() => navigateGameList(key)}
                            key={key}
                            className={`${
                              data?.[key]?.inPlay === 1 ? "inplay-on" : ""
                            }`}
                          >
                            <a id="info">
                              <dl>
                                <dt>
                                  {data?.[key]?.isTv === 1 && (
                                    <span
                                      id="streamingIcon"
                                      className="game-live"
                                      style={{ display: "flex" }}
                                    >
                                      game-live
                                    </span>
                                  )}
                                  {data?.[key]?.isFancy === 1 && (
                                    <span
                                      id="fancyBetIcon"
                                      className="game-fancy in-play"
                                      style={{ display: "flex" }}
                                    >
                                      <pre>in-play</pre>
                                      Fancy
                                    </span>
                                  )}

                                  {data?.[key]?.bookmaker === 1 && (
                                    <span
                                      id="bookMakerIcon"
                                      className="game-bookmaker in-play"
                                      style={{ display: "flex" }}
                                    >
                                      <pre>in-play</pre>
                                      BookMaker
                                    </span>
                                  )}

                                  {data?.[key]?.inPlay === 1 ? (
                                    <span className="time">In-Play</span>
                                  ) : (
                                    <span className="time">
                                      {data?.[key]?.date}
                                    </span>
                                  )}
                                  {/* {data?.[key]?.eventTypeId === 4 && (
                                <span id="sportsBookEIcon_4" className="game-E">
                                  <i />
                                  Cricket
                                </span>
                              )}
                              {data?.[key]?.eventTypeId === 2 && (
                                <span id="sportsBookEIcon_2" className="game-E">
                                  <i />
                                  Tennis
                                </span>
                              )}
                              {data?.[key]?.eventTypeId === 1 && (
                                <span id="sportsBookEIcon_2" className="game-E">
                                  <i />
                                  Football
                                </span>
                              )} */}
                                </dt>
                                <dd id="eventName">{data?.[key]?.eventName}</dd>
                              </dl>
                            </a>
                          </li>
                        );
                      })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InPlay;
