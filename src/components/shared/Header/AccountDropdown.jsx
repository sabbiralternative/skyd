import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { Settings } from "../../../api";
import useWhatsApp from "../../../hooks/whatsapp";

const AccountDropdown = ({ setShowReferral, setShowDropdown }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data: socialLink } = useWhatsApp();
  const handleLogout = () => {
    dispatch(logout());
  };

  const navigateWhatsApp = (link) => {
    window.open(link, "_blank");
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };
  return (
    <ul id="account_pop" style={{ display: "block" }}>
      <li>
        <h4>
          <span>{user}</span>
        </h4>
        {/* <span className="gmt" title="Time Zone">
          GMT+5:30
        </span> */}
      </li>

      <li>
        <Link onClick={closeDropdown} to="/deposit">
          Deposit
        </Link>
      </li>
      <li>
        <Link onClick={closeDropdown} to="/withdraw">
          Withdraw
        </Link>
      </li>
      <li>
        <Link onClick={closeDropdown} to="/deposit-withdraw-report">
          Deposit Withdraw Report
        </Link>
      </li>

      <li>
        <Link onClick={closeDropdown} to="/open-bets">
          Open Bets
        </Link>
      </li>

      <li>
        <Link onClick={closeDropdown} to="/betting-profit-loss">
          Betting Profit Loss
        </Link>
      </li>
      <li>
        <Link onClick={closeDropdown} to="/my-bank-details">
          My Bank Details
        </Link>
      </li>
      <li>
        <Link onClick={closeDropdown} to="/bonus-statement">
          Bonus Statement
        </Link>
      </li>
      <li>
        <Link onClick={closeDropdown} to="/change-password">
          Change Password
        </Link>
      </li>
      <li>
        <Link onClick={closeDropdown} to="/edit-stake">
          Edit Stake
        </Link>
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
        <Link onClick={closeDropdown} to="/referral-statement">
          Referral Statement
        </Link>
      </li>

      {socialLink?.whatsapplink && (
        <li onClick={() => navigateWhatsApp(socialLink?.whatsapplink)}>
          <a>All Support</a>
        </li>
      )}
      {socialLink?.branchWhatsapplink && (
        <li onClick={() => navigateWhatsApp(socialLink?.branchWhatsapplink)}>
          <a>Deposit Support</a>
        </li>
      )}

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
