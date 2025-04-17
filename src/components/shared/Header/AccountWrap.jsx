import { useRef, useState } from "react";
import useBalance from "../../../hooks/balance";
import AccountDropdown from "./AccountDropdown";
import useCloseModalClickOutside from "../../../hooks/closeModal";

const AccountWrap = ({ setShowReferral }) => {
  const [showDropdown, setShowDropdown] = useState();
  const { data } = useBalance();
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setShowDropdown(false);
  });

  return (
    <ul className="account-wrap">
      <li className="main-wallet">
        <a id="multiWallet" href="#multiBalancePop" className="a-wallet">
          <ul id="accountCredit">
            <li>
              <span>Main Balance</span>{" "}
              <span id="betCredit">{data?.availBalance}</span>
            </li>
            <li>
              <span>Exposure</span>{" "}
              <span id="totalExposure">{data?.deductedExposure}</span>
            </li>
          </ul>

          {/* <div className="wallet-detail" id="multiBalancePop">
            <div className="wallet-detail-group">
              <dl className="wallet-detail-content">
                <dt>Main Balance</dt>
                <dd className="wallet-balance-num">
                  <span className="badge-currency" id="currency">
                    USD
                  </span>
                  <span id="mainBalance">1,019.66</span>
                </dd>
                <dd className="wallet-exposure">
                  Exposure <span id="mainExposure">0.00</span>
                </dd>
              </dl>
            </div>
            <div id="walletContent" className="wallet-detail-group"></div>

            <div className="btn-box">
              <button className="btn">Close</button>
            </div>
          </div> */}
        </a>
        <a id="menuRefresh" className="a-refresh" title="Refresh Main Wallet">
          <img src="/images/transparent.gif" />
        </a>
      </li>

      <li ref={ref} className="account">
        <a
          onClick={() => setShowDropdown((prev) => !prev)}
          id="accountPopup"
          style={{ cursor: "pointer" }}
        >
          My Account{" "}
        </a>
        {showDropdown && (
          <AccountDropdown
            setShowReferral={setShowReferral}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
          />
        )}
      </li>
    </ul>
  );
};

export default AccountWrap;
