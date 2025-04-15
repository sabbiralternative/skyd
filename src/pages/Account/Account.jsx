import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Referral from "../../components/modals/Referral";
import { Settings } from "../../api";
import useWhatsApp from "../../hooks/whatsapp";
import { logout } from "../../redux/features/auth/authSlice";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: socialLink } = useWhatsApp();
  const { user } = useSelector((state) => state.auth);
  const [showReferral, setShowReferral] = useState(false);

  const navigateWhatsApp = (link) => {
    window.open(link, "_blank");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      {showReferral && <Referral setShowReferral={setShowReferral} />}
      <div className="mian-wrap">
        <div className="path-wrap">
          <p className="account-id">
            <span>{user}</span>
            <span className="time-zone">GMT+5:30</span>
          </p>
        </div>

        <ul className="menu-list">
          <li className="">
            <Link to="/deposit-withdraw-report">Deposit Withdraw Report</Link>
          </li>

          <li className="">
            <Link to="/open-bets">Open Bets</Link>
          </li>
          <li className="">
            <Link to="/betting-profit-loss">Betting Profit Loss</Link>
          </li>
          <li className="">
            <Link to="/my-bank-details">My Bank Details</Link>
          </li>

          <li className="">
            <Link to="/bonus-statement">Bonus Statement</Link>
          </li>

          <li className="">
            <Link to="/change-password">Change Password</Link>
          </li>
          <li className="">
            <Link to="/edit-stake">Edit Stake</Link>
          </li>

          {Settings.referral && (
            <li onClick={() => setShowReferral(true)} className="">
              <Link>Referral</Link>
            </li>
          )}
          <li className="">
            <Link to="/referral-statement">Referral Statement</Link>
          </li>
          {socialLink?.whatsapplink && (
            <li
              className=""
              onClick={() => navigateWhatsApp(socialLink?.whatsapplink)}
            >
              <Link>All Support</Link>
            </li>
          )}
          {socialLink?.branchWhatsapplink && (
            <li
              className=""
              onClick={() => navigateWhatsApp(socialLink?.branchWhatsapplink)}
            >
              <Link>Deposit Support</Link>
            </li>
          )}
        </ul>

        <Link onClick={handleLogout} id="logout" className="logout">
          LOGOUT
        </Link>
      </div>
    </>
  );
};

export default Account;
