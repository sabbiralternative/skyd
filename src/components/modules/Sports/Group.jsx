import { useNavigate } from "react-router-dom";

const Group = ({ data }) => {
  const navigate = useNavigate();

  const filterGames = (data) => {
    let filterData = [];
    if (data) {
      filterData =
        Object.values(data).length > 0 &&
        Object.keys(data)
          .sort((keyA, keyB) => data[keyA].sort - data[keyB].sort)
          .filter((key) => {
            return data[key]?.visible === true;
          });
      return filterData;
    }
  };

  const filterVisibleGame = filterGames(data);

  const navigateGameList = (key) => {
    navigate(`/event-details/${data[key]?.eventTypeId}/${key}`);
  };

  return (
    <ul id="highlightList" className="highlight-list">
      {data &&
        filterVisibleGame?.map((key) => {
          return (
            <li
              onClick={() => navigateGameList(key)}
              key={key}
              className={`${data?.[key]?.inPlay === 1 ? "inplay-on" : ""}`}
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
                      <span className="time">{data?.[key]?.date}</span>
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
              {/* <a id="multiMarketPin" className="pin-off" href="#" /> */}
            </li>
          );
        })}
    </ul>
  );
};

export default Group;
