import { Link, useLocation } from "react-router-dom";

const BottomMenu = () => {
  const { pathname } = useLocation();
  return (
    <div className="menu-wrap">
      <div className="full-wrap">
        <ul id="tabMenu" className="menu">
          <li>
            <Link
              id="menu_Home"
              to="/"
              className={`${pathname === "/" ? "select" : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`${pathname === "/sports/inPlay/0" ? "select" : ""}`}
              to="/sports/inPlay/0"
            >
              In-Play
            </Link>
          </li>

          <li>
            <Link
              className={`${pathname === "/sports/cricket/4" ? "select" : ""}`}
              to="/sports/cricket/4"
            >
              {/* <span id="tagLive" className="tag-live" style={{}}>
                <strong />2
              </span> */}
              Cricket
            </Link>
          </li>
          <li>
            <Link
              className={`${pathname === "/sports/football/2" ? "select" : ""}`}
              to="/sports/football/1"
              id="menu_E_SOCCER"
            >
              {/* <span id="tagLive" className="tag-live" style={{}}>
                <strong />1
              </span> */}
              Football
            </Link>
          </li>
          <li>
            <Link
              className={`${pathname === "/sports/tennis/2" ? "select" : ""}`}
              to="/sports/tennis/2"
            >
              {/* <span id="tagLive" className="tag-live" style={{}}>
                <strong />
                12
              </span> */}
              Tennis
            </Link>
          </li>
          <li>
            <Link>Multi Markets</Link>
          </li>
        </ul>
        <ul className="setting-wrap">
          <li className="time_zone">
            <span>Time Zone :</span> GMT+5:30
          </li>
          <li>&nbsp;&nbsp;&nbsp;</li>
          <li>
            <Link
              id="oneClickSetting"
              className="one_click"
              style={{ cursor: "pointer" }}
            >
              <img src="/images/transparent.gif" />
              One Click Bet
            </Link>
          </li>
          <li>
            <Link
              id="slipSet"
              className="setting"
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              Setting <img src="/images/transparent.gif" />
            </Link>
          </li>
        </ul>
        <div id="set_pop" className="slip_set-pop" style={{ display: "none" }}>
          <div id="coinList" className="set-content">
            <dl className="odds-set">
              <dd className="col-defult">
                <label htmlFor="defult_stake">
                  <strong>Default stake </strong>
                </label>
                <input
                  id="userCoin"
                  className="stake-input"
                  type="text"
                  maxLength={7}
                  defaultValue
                />
              </dd>
            </dl>
            <dl id="stakeSet" className="stake-set">
              <dt>Stake</dt>
              <dd>
                <Link
                  id="coin_1"
                  style={{ cursor: "pointer" }}
                  className="btn select"
                >
                  4
                </Link>
              </dd>
              <dd>
                <Link
                  id="coin_2"
                  style={{ cursor: "pointer" }}
                  className="btn select"
                >
                  30
                </Link>
              </dd>
              <dd>
                <Link
                  id="coin_3"
                  style={{ cursor: "pointer" }}
                  className="btn select"
                >
                  50
                </Link>
              </dd>
              <dd>
                <Link id="coin_4" style={{ cursor: "pointer" }} className="btn">
                  100
                </Link>
              </dd>
              <dd>
                <Link
                  id="coin_5"
                  style={{ cursor: "pointer" }}
                  className="btn select"
                >
                  200
                </Link>
              </dd>
              <dd>
                <Link id="coin_6" style={{ cursor: "pointer" }} className="btn">
                  300
                </Link>
              </dd>
              <dd>
                <Link
                  id="coin_7"
                  style={{ cursor: "pointer" }}
                  className="btn select"
                >
                  500
                </Link>
              </dd>
              <dd>
                <Link
                  id="coin_8"
                  style={{ cursor: "pointer" }}
                  className="btn select"
                >
                  1000
                </Link>
              </dd>
              <dd className="col-edit">
                <Link id="edit" className="btn-edit">
                  Edit <img src="images/transparent.gif" />
                </Link>
              </dd>
            </dl>
            <dl
              id="editCustomizeStakeList"
              className="stake-set"
              style={{ display: "none" }}
            >
              <dt>Stake</dt>
              <dd>
                <input
                  id="stakeEdit_1"
                  className="stake_edit-input"
                  type="text"
                  defaultValue
                  maxLength={7}
                />
              </dd>
              <dd>
                <input
                  id="stakeEdit_2"
                  className="stake_edit-input"
                  type="text"
                  defaultValue
                  maxLength={7}
                />
              </dd>
              <dd>
                <input
                  id="stakeEdit_3"
                  className="stake_edit-input"
                  type="text"
                  defaultValue
                  maxLength={7}
                />
              </dd>
              <dd>
                <input
                  id="stakeEdit_4"
                  className="stake_edit-input"
                  type="text"
                  defaultValue
                  maxLength={7}
                />
              </dd>
              <dd>
                <input
                  id="stakeEdit_5"
                  className="stake_edit-input"
                  type="text"
                  defaultValue
                  maxLength={7}
                />
              </dd>
              <dd>
                <input
                  id="stakeEdit_6"
                  className="stake_edit-input"
                  type="text"
                  defaultValue
                  maxLength={7}
                />
              </dd>
              <dd>
                <input
                  id="stakeEdit_7"
                  className="stake_edit-input"
                  type="text"
                  defaultValue
                  maxLength={7}
                />
              </dd>
              <dd>
                <input
                  id="stakeEdit_8"
                  className="stake_edit-input"
                  type="text"
                  defaultValue
                  maxLength={7}
                />
              </dd>
              <dd className="col-edit">
                <Link id="ok" className="btn-send">
                  OK
                </Link>
              </dd>
            </dl>
            <dl className="odds-set">
              <dt>Odds</dt>
              <dd>
                <input id="enableSparkCheck" type="checkbox" />
                <label htmlFor="enableSparkCheck">
                  Highlight when odds change
                </label>
              </dd>
            </dl>
            <dl className="odds-set">
              <dt>FancyBet</dt>
              <dd>
                <input id="fancyBetAcceptAnyOddsCheckBox" type="checkbox" />
                <label htmlFor="fancy_odd">Accept Any Odds </label>
              </dd>
            </dl>
            <dl className="odds-set">
              <dt>Win Selection forecast</dt>
              <dd>
                <input id="withCommCheckBox" type="checkbox" />
                <label htmlFor="withCommCheckBox">With Commission</label>
              </dd>
            </dl>
            <ul className="btn-wrap">
              <li>
                <Link
                  id="closeSet"
                  className="btn"
                  style={{ cursor: "pointer" }}
                >
                  Cancel
                </Link>
              </li>
              <li className="col-send">
                <Link
                  id="coinSave"
                  className="btn-send"
                  style={{ cursor: "pointer" }}
                >
                  Save
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomMenu;
