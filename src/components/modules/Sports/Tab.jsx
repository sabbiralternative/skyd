import { useDispatch, useSelector } from "react-redux";
import { setGroup } from "../../../redux/features/global/globalSlice";

const Tab = () => {
  const dispatch = useDispatch();
  const { group } = useSelector((state) => state.global);

  const handleChangeGroup = (group) => {
    dispatch(setGroup(group));
  };
  return (
    <div id="highlightLabel" className="highlight-fix">
      <a className="a-search" href="#">
        Search
      </a>
      <div
        id="frame"
        className="wrap-highlight ps ps--theme_default ps--active-x"
      >
        <ul id="label" style={{ left: "0px" }}>
          <li
            onClick={() => handleChangeGroup(4)}
            id="highlightTab4"
            className={`${group === 4 ? "select" : ""}`}
          >
            <a>
              <img
                className="icon-cricket"
                src="/src/assets/img/transparent.gif"
              />
              Cricket
            </a>
          </li>
          <li
            className={`${group === 1 ? "select" : ""}`}
            onClick={() => handleChangeGroup(1)}
            id="highlightTab_IPL Winner"
          >
            <a>
              <img
                className="icon-cricket"
                src="/src/assets/img/transparent.gif"
              />
              Football
            </a>
          </li>
          <li
            className={`${group === 2 ? "select" : ""}`}
            onClick={() => handleChangeGroup(2)}
            id="highlightTab1"
          >
            <a>
              <img
                className="icon-soccer"
                src="/src/assets/img/transparent.gif"
              />
              Tennis
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tab;
