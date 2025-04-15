const RightSidebar = () => {
  return (
    <div className="col-right">
      <div className="slip-wrap no-open-bet_slip">
        <h3>
          <a className="to-expand" style={{ cursor: "pointer" }}>
            Bet Slip
          </a>
        </h3>
        <ul id="loadingMsg" className="loading" style={{ display: "none" }}>
          <li>
            <img src="images/loading40.gif" />
          </li>
          <li id="countDownTime">Place Bets</li>
        </ul>
        <div className="message-bet">
          <h4 id="errorMsg" className="error" style={{ display: "none" }} />
          <p id="betMsg" className="warning" style={{ display: "none" }} />
        </div>
        <p id="noBetSlipInfo" style={{ display: "" }}>
          Click on the odds to add selections to the betslip.
        </p>
        <div id="betSlipBoard" className="bet_slip" style={{ display: "none" }}>
          <div
            id="betList"
            className="slip-list"
            style={{ maxHeight: "calc(100% - 86px)" }}
          >
            <dd
              id="stakePopupList"
              className="col-stake_list"
              style={{ display: "none" }}
            >
              <ul>
                <li>
                  <a
                    className="btn"
                    id="selectStake_1"
                    style={{ cursor: "pointer" }}
                  >
                    1000
                  </a>
                </li>
                <li>
                  <a
                    className="btn"
                    id="selectStake_2"
                    style={{ cursor: "pointer" }}
                  >
                    10000
                  </a>
                </li>
                <li>
                  <a
                    className="btn"
                    id="selectStake_3"
                    style={{ cursor: "pointer" }}
                  >
                    30000
                  </a>
                </li>
                <li>
                  <a
                    className="btn"
                    id="selectStake_4"
                    style={{ cursor: "pointer" }}
                  >
                    100000
                  </a>
                </li>
                <li>
                  <a
                    className="btn"
                    id="selectStake_5"
                    style={{ cursor: "pointer" }}
                  >
                    300000
                  </a>
                </li>
                <li>
                  <a
                    className="btn"
                    id="selectStake_6"
                    style={{ cursor: "pointer" }}
                  >
                    500000
                  </a>
                </li>
              </ul>
              <p id="totalStakeP" style={{ display: "none" }}>
                Total Stake: <strong id="totalStake" />
              </p>
            </dd>
            <div
              id="oddsTipsPopup"
              className="tips-popup"
              style={{ display: "none" }}
            >
              min 1.01
            </div>
            <div
              id="stakeTipsPopup"
              className="tips-popup"
              style={{ display: "none" }}
            >
              Min 4.00
            </div>
            <ul
              id="backSlipHeader"
              className="slip-head"
              name="slipHeader"
              style={{ display: "none" }}
            >
              <li className="col-bet">Back (Bet For)</li>
              <li id="oddsHeader" className="col-odd">
                Odds
              </li>
              <li
                id="runsHeader"
                className="col-odd"
                style={{ display: "none" }}
              >
                Unit:Runs
              </li>
              <li className="col-stake">Stake</li>
              <li className="col-profit">Profit</li>
            </ul>
            <ul
              id="laySlipHeader"
              className="slip-head"
              name="slipHeader"
              style={{ display: "none" }}
            >
              <li className="col-bet">Lay (Bet Against)</li>
              <li id="oddsHeader" className="col-odd">
                Odds
              </li>
              <li
                id="runsHeader"
                className="col-odd"
                style={{ display: "none" }}
              >
                Unit:Runs
              </li>
              <li className="col-stake">Stake</li>
              <li className="col-profit">Liability</li>
            </ul>
            <div id="headerTemplate" style={{ display: "none" }}>
              <h4>
                <img className="icon-in_play" src="images/transparent.gif" />
                Team a v Team b
              </h4>
            </div>
            <dl
              id="betTemplate"
              className="slip-back"
              style={{ display: "none" }}
            >
              <dt>
                <a id="delete" className="delete" style={{ cursor: "pointer" }}>
                  delete
                </a>
                <span id="marketName">Match Odds</span>
              </dt>
              <dd className="col-odd">
                <input id="odds" type="text" maxLength={6} autoComplete="off" />
                <ul className="odd-add">
                  <li>
                    <a id="oddsUp" className="up" style={{ cursor: "pointer" }}>
                      up
                    </a>
                  </li>
                  <li>
                    <a
                      id="oddsDown"
                      className="down"
                      style={{ cursor: "pointer" }}
                    >
                      down
                    </a>
                  </li>
                </ul>
                <ul id="oddsTipsPoint" />
              </dd>
              <dd className="col-stake">
                <input id="inputStake" type="text" defaultValue maxLength={7} />
                <ul id="listPoint" />
              </dd>
              <dd id="profitLiability" className="col-profit" />
              <dd
                id="asianHandicapForecast"
                className="bet-forecast"
                style={{ display: "none" }}
              >
                <div className="bet-forecast-info">
                  <span id="forecastDesc_1" />
                  <span id="winLoss_1" />
                </div>
                <div className="bet-forecast-info">
                  <span id="forecastDesc_2" />
                  <span id="winLoss_2" />
                </div>
                <div className="bet-forecast-info">
                  <span id="forecastDesc_3" />
                  <span id="winLoss_3" />
                </div>
              </dd>
              {/* dynamic min bet for match odds */}
              <dd className="keep-option">
                <p className="dynamic-min-bet">
                  Min Bet: <strong id="dynamicMinBet" />
                </p>
              </dd>
              <dd
                id="inningsRuns"
                className="inn_runs"
                style={{ display: "none" }}
              >
                <dl>
                  <dt id="ifRuns" />
                  <dd>
                    <span id="runsPL" className="green" />
                  </dd>
                  <dt id="ifLess" />
                  <dd>
                    <span id="lessPL" className="green" />
                  </dd>
                </dl>
              </dd>
            </dl>
          </div>
          <div id="betSlipFullBtn" className="full_btn">
            <dl className="sum">
              <dt>Liability</dt>
              <dd>
                <span id="total" className="red">
                  {" "}
                  0.00
                </span>
              </dd>
            </dl>
            <ul className="btn-wrap">
              <li>
                <a
                  id="cancelAll"
                  className="btn"
                  style={{ cursor: "pointer" }}
                  tabIndex={0}
                >
                  Cancel All
                </a>
              </li>
              <li>
                <a
                  id="placeBets"
                  className="btn-send"
                  style={{ cursor: "pointer" }}
                  tabIndex={0}
                >
                  Place Bets
                </a>
              </li>
            </ul>
            <ul className="slip-option">
              <li>
                <input id="comfirmBets" type="checkbox" />
                <label htmlFor="comfirmBets">Please confirm your bets.</label>
              </li>
            </ul>
          </div>
        </div>
        <div
          id="confirmBetList"
          className="slip-list"
          style={{ maxHeight: "calc(100% - 96px)", display: "none" }}
        >
          <div className="message-bet">
            <h4 className="warning">Please confirm your bets.</h4>
            <p>A commission is charged on your net profit from each market.</p>
          </div>
          <ul
            id="backSlipHeader"
            className="slip-head"
            style={{ display: "none" }}
          >
            <li className="col-bet">Back (Bet For)</li>
            <li className="col-odd">Odds</li>
            <li className="col-stake">Stake</li>
            <li className="col-profit">Profit</li>
          </ul>
          <ul
            id="laySlipHeader"
            className="slip-head"
            style={{ display: "none" }}
          >
            <li className="col-bet">Lay (Bet Against)</li>
            <li className="col-odd">Odds</li>
            <li className="col-stake">Stake</li>
            <li className="col-profit">Liability</li>
          </ul>
          <div id="confirmHeader" style={{ display: "none" }}>
            <h4>
              <img className="icon-in_play" src="images/transparent.gif" />
            </h4>
          </div>
          <dl
            id="confirmBetTemplate"
            className="slip-back"
            style={{ display: "none" }}
          >
            <dt>
              <span id="slipType" className="slip-type">
                --
              </span>
              <span id="selectionName">--</span>
              <span id="marketName">--</span>
            </dt>
            <dd id="price" className="col-odd">
              --
            </dd>
            <dd id="size" className="col-stake">
              --
            </dd>
            <dd id="profitLiability" className="col-profit">
              --
            </dd>
          </dl>
        </div>
        <div
          id="confirmBetFullBtn"
          className="full_btn"
          style={{ display: "none" }}
        >
          <dl className="sum">
            <dt />
            <dd>
              <span />
            </dd>
          </dl>
          <ul className="btn-wrap">
            <li>
              <a id="editBets" className="btn" style={{ cursor: "pointer" }}>
                Edit Bets
              </a>
            </li>
            <li>
              <a
                id="submitBets"
                className="btn-send"
                style={{ cursor: "pointer" }}
              >
                Confirm Bets
              </a>
            </li>
          </ul>
          <ul className="slip-option">
            <li>
              <input
                id="comfirmBets"
                type="checkbox"
                defaultChecked="checked"
              />
              <label>Confirm bets before placing</label>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="matched-wrap"
        style={{ display: "none", height: "calc(100% - 301px)" }}
      >
        <h3>
          <a
            id="openBetsRefresh"
            className="slip_refresh"
            style={{ cursor: "pointer" }}
          >
            Refresh
          </a>
          <a className="to-expand" style={{ cursor: "pointer" }}>
            Open Bets
          </a>
        </h3>
        <div className="message-bet">
          <h4 id="oneClickMsg" className style={{ display: "none" }} />
        </div>
        <div
          id="oneClickLoadingWrap"
          className="one_click-loading"
          style={{ display: "none" }}
        >
          <div
            id="loadPending"
            className="load-pending"
            style={{ display: "none" }}
          >
            <strong id="pendingNum" />
            pending...
          </div>
          <ul className="loading">
            <li>
              <img src="images/loading40.gif" />
            </li>
            <li id="oneClickTime">Place Bets</li>
          </ul>
        </div>
        <div className="message-bet">
          <h4 id="editErrorMsg" className="error" style={{ display: "none" }} />
          <p id="editBetMsg" className="warning" style={{ display: "none" }} />
        </div>
        <ul id="processingImg" className="loading" style={{ display: "none" }}>
          <li>
            <img src="images/loading40.gif" />
          </li>
          <li>Processing...</li>
        </ul>
        <div id="matchSection" style={{ height: "calc(100% - 25px)" }}>
          <div id="openBetSelectionBox" className="slip-sort">
            <select id="selectMenu" name>
              <option id="option0" value style={{ display: "block" }}>
                {" "}
                -- Select --{" "}
              </option>
            </select>
            <option id="optionTemplate" value style={{ display: "none" }} />
          </div>
          <div
            id="openBetSlip"
            className="bet_slip over-wrap"
            style={{ height: "calc(100% - 35px)", display: "none" }}
          >
            <ul
              id="unMatchTicketHead"
              className="slip-head"
              style={{ display: "none" }}
            >
              <li className="col-bet">
                <strong id="headerInfo">Unmatched</strong>
              </li>
            </ul>
            <div
              id="unMatchTicketList"
              className="slip-list"
              style={{ display: "none" }}
            >
              <ul
                id="backSlipHeader"
                className="matched-head"
                style={{ display: "none" }}
              >
                <li className="col-bet">Back (Bet For)</li>
                <li className="col-odd">Odds</li>
                <li className="col-stake">Stake</li>
                <li className="col-profit">Profit</li>
              </ul>
              <ul
                id="laySlipHeader"
                className="matched-head"
                style={{ display: "none" }}
              >
                <li className="col-bet">Lay (Bet Against)</li>
                <li className="col-odd">Odds</li>
                <li className="col-stake">Stake</li>
                <li className="col-profit">Liability</li>
              </ul>
              <dl
                id="unMatchTicketTemplate"
                className="slip-lay"
                style={{ display: "none" }}
              >
                <dd id="betInfo" className="refer" style={{ display: "none" }}>
                  <span id="betId">Ref: --</span>
                  <span id="placeDate">xx-xx-2016 --:--</span>
                </dd>
                <dt id="marketNameDt">
                  <a
                    id="delete"
                    className="delete"
                    style={{ cursor: "pointer" }}
                  >
                    delete
                  </a>
                  <span id="slipType" className="slip-type">
                    --
                  </span>
                  <span id="marketName">--</span>
                </dt>
                <dd id="price" className="col-odd">
                  --
                </dd>
                <dd id="size" className="col-stake">
                  --
                </dd>
                <dd id="profitLiability" className="col-profit">
                  --
                </dd>
                <dd
                  id="inningsRuns"
                  className="inn_runs"
                  style={{ display: "none" }}
                >
                  <dl>
                    <dt id="ifRuns" />
                    <dd>
                      <span id="runsPL" className="green">
                        $0.00
                      </span>
                    </dd>
                    <dt id="ifLess" />
                    <dd>
                      <span id="lessPL" className="green">
                        $0.00
                      </span>
                    </dd>
                  </dl>
                </dd>
                <dd
                  id="keepOption"
                  className="keep-option"
                  style={{ display: "none" }}
                >
                  At In-Play, this unmatched bet will be
                  <span id="editKeepOption" className="edit"></span>
                </dd>
              </dl>
            </div>
            <div
              id="unMatchFullBtn"
              className="full_btn"
              style={{ display: "none" }}
            >
              <dl className="sum"></dl>
              <ul className="btn-wrap">
                <li>
                  <a
                    id="cancelAllUnMatch"
                    className="btn"
                    style={{ cursor: "pointer" }}
                    tabIndex={0}
                  >
                    Cancel All
                  </a>
                </li>
                <li>
                  <a
                    id="editAllBets"
                    className="btn-send"
                    style={{ cursor: "pointer" }}
                    tabIndex={0}
                  >
                    Edit Bets
                  </a>
                </li>
              </ul>
            </div>

            <div className="full_btn">
              <ul className="slip-option">
                <li>
                  <input id="showBetInfo" type="checkbox" name="openOption" />
                  <label htmlFor="showBetInfo">Bet Info</label>
                </li>
                <li name="showTimeOption">
                  <input id="showTimeOrder" type="checkbox" />
                  <label htmlFor="showTimeOrder">Time Order</label>
                </li>
                <li name="txnOption">
                  <input id="consolidate" type="checkbox" name="openOption" />
                  <label htmlFor="consolidate">Consolidate</label>
                </li>
                <li name="txnOption">
                  <input id="averageOdds" type="checkbox" name="openOption" />
                  <label htmlFor="averageOdds">Average Odds</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
