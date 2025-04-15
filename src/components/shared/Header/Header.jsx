import BottomMenu from "./BottomMenu";
import LoginForm from "./LoginForm";

const Header = () => {
  return (
    <div className="top">
      <div className="header full-wrap">
        <h1>
          <a href="/">SKYEXCHANGE </a>
        </h1>
        <div id="searchWrap" className="search-wrap">
          <div>
            <input
              id="searchInput"
              className="search-input"
              type="text"
              placeholder="Search Events"
            />
            <button
              id="searchClear"
              className="search-clear"
              style={{ display: "none" }}
            />
          </div>
          <div
            id="searchResult"
            className="suggestion-wrap"
            style={{ display: "none" }}
          >
            <ul id="searchList">
              <li id="noMatching" style={{ display: "none" }}>
                <p className="no-matching">No events found matching ...</p>
              </li>
              <li id="resultTemplate" style={{ display: "none" }}>
                <a />
              </li>
            </ul>
          </div>
        </div>
        <LoginForm />
      </div>
      {/* Menu Wrap */}
      <BottomMenu />
    </div>
  );
};

export default Header;
