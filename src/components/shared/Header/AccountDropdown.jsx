import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { Settings } from "../../../api";

const AccountDropdown = ({ setShowReferral, setShowDropdown }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <ul id="account_pop" style={{ display: "block" }}>
      <li>
        <h4>
          <span>{user}</span>
        </h4>
        <span className="gmt" title="Time Zone">
          GMT+5:30
        </span>
      </li>

      <li>
        <a href="/exchange/member/myAccount/detail.jsp" target="_blank">
          My Profile
        </a>
      </li>

      <li>
        <a href="/exchange/member/myAccount/summary.jsp" target="_blank">
          Balance Overview
        </a>
      </li>

      <li>
        <a
          href="/exchange/member/myAccount/accountCashStatement.jsp"
          target="_blank"
        >
          Account Statement
        </a>
      </li>
      {Settings.referral && (
        <li
          onClick={() => {
            setShowReferral(true);
            setShowDropdown(false);
          }}
        >
          <a>Referral</a>
        </li>
      )}

      <li>
        <Link to="/referral-statement">Referral Statement</Link>
      </li>

      <li>
        <a href="/exchange/member/myAccount/current_bets.jsp" target="_blank">
          My Bets
        </a>
      </li>
      <li>
        <a href="/exchange/member/myAccount/bet_history.jsp" target="_blank">
          Bets History
        </a>
      </li>

      <li>
        <a href="/exchange/member/myAccount/profit_loss.jsp" target="_blank">
          Profit &amp; Loss
        </a>
      </li>

      <li>
        <a href="/exchange/member/myAccount/activityLog.jsp" target="_blank">
          Activity Log
        </a>
      </li>

      <li onClick={handleLogout} className="logout">
        <a style={{ display: "flex" }} id="logout">
          LOGOUT
          <img src="/images/transparent.gif" />
        </a>
      </li>
    </ul>
  );
};

export default AccountDropdown;
