const LeftSidebar = () => {
  return (
    <div className="col-left" style={{ display: "block" }}>
      <div
        className="sub_path"
        id="subMenu"
        style={{ height: "calc(100% - 0px)" }}
      >
        <div className="path">Sports</div>

        <ul
          id="listBoardLoading"
          className="loading"
          style={{ display: "none" }}
        >
          <li>
            <img src="images/loading40.gif" />
          </li>
          <li>Loading...</li>
        </ul>
        {/* Sub Menu */}
        <ul id="listBoard" className="menu-list">
          <li id="allSports" className="path-last" style={{ display: "show" }}>
            <a href="/exchange/member/index.jsp">All Sports</a>
          </li>
          <div id="sportStage" />
          <li
            id="listBoardTemplate"
            className="listBoard"
            style={{ display: "none" }}
          >
            <a id="arrow" className="Go" style={{ cursor: "pointer" }}>
              Go
            </a>
            <a id="name" style={{ cursor: "pointer" }} />
          </li>
          <div id="selectedMenu" />
          {/* OCER Menu START */}
          <ul id="ocerTopCompetitions" style={{ display: "none" }}>
            <li className="menu-group-title">Top Competitions</li>
          </ul>
          <ul id="ocerTopCountries" style={{ display: "none" }}>
            <li className="menu-group-title">Top Countries</li>
          </ul>
          <ul id="ocerInternationalCompetitions" style={{ display: "none" }}>
            <li className="menu-group-title">International Competitions</li>
          </ul>
          <ul id="ocerCompetitions" style={{ display: "none" }}>
            <li className="menu-group-title">Competitions</li>
          </ul>
          <ul id="ocerGroupTemplate" style={{ display: "none" }}>
            <li className="menu-group-title" />
          </ul>
          <ul id="ocerMarkets" style={{ display: "none" }}>
            <img
              id="inplayIconTemplate"
              src="images/transparent.gif"
              style={{ display: "none" }}
            />
            <li className="menu-group-title" />
          </ul>
          <div id="ocerGroup" />
          <ul id="ocerAllregion" style={{ display: "none" }}>
            <li className="menu-group-title">All Countries</li>
          </ul>
          <ul id="ocerAllCompetition" style={{ display: "none" }}>
            <li className="menu-group-title">All Competitions</li>
          </ul>
          <ul id="common" style={{ display: "none" }}>
            <li className="menu-group-title">Common</li>
          </ul>
          <ul id="othersEvents" style={{ display: "none" }}>
            <li className="menu-group-title" />
          </ul>
          {/* OCER Menu END */}
          <ul id="topCompetitions" style={{ display: "none" }}>
            <li className="menu-group-title">Top Competitions</li>
          </ul>
          <li className>
            <a href="/exchange/member/index.jsp?eventType=4" id="navi_4">
              Cricket
            </a>
          </li>
          <ul id="commonGroup" style={{ display: "none" }}>
            <li className="menu-group-title">Common</li>
          </ul>
          <li className>
            <a id="navi_28127348"> Indian Premier League</a>
          </li>
          <li className="menu-select-head">
            <a id="navi_34213127">Punjab Kings v Kolkata Knight Riders</a>
          </li>
          <li
            id="naviMenu_1_242260021"
            className="listBoard"
            style={{ display: "list-item" }}
          >
            <a
              id="arrow"
              className="Go"
              style={{ cursor: "pointer", display: "none" }}
            >
              Go
            </a>
            <a
              id="name"
              style={{ cursor: "pointer" }}
              type="MARKET"
              href="/exchange/member/fullMarket?eventType=4&eventId=34213127&marketId=1.242260021"
              className="select"
            >
              <img className="icon-no_play" src="/images/transparent.gif" />{" "}
              Match Odds
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
