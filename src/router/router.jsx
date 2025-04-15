import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Sports from "../pages/Sports/Sports";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import StakeSetting from "../pages/StakeSetting/StakeSetting";
import InPlay from "../pages/InPlay/InPlay";
import Deposit from "../pages/Deposit/Deposit";
import Withdraw from "../pages/Withdraw/Withdraw";
import Account from "../pages/Account/Account";
import DepositWithdrawReport from "../pages/DepositWithdrawReport/DepositWithdrawReport";
import OpenBets from "../pages/OpenBets/OpenBets";
import BettingProfitLoss from "../pages/BettingProfitLoss/BettingProfitLoss";
import SingleProfitLoss from "../pages/BettingProfitLoss/SingleProfitLoss";
import MyBankDetails from "../pages/MyBankDetails/MyBankDetails";
import BonusStatement from "../pages/BonusStatement/BonusStatement";
import ReferralStatement from "../pages/ReferralStatement/ReferralStatement";
import EventDetails from "../pages/EventDetails/EventDetails";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <>
          <App />
        </>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/sports/:name/:group",
          element: <Sports />,
        },
        {
          path: "/event-details/:eventTypeId/:eventId",
          element: <EventDetails />,
        },
        {
          path: "/in-play",
          element: <InPlay />,
        },
        {
          path: "/deposit",
          element: <Deposit />,
        },
        {
          path: "/withdraw",
          element: <Withdraw />,
        },
        {
          path: "/account",
          element: <Account />,
        },
        {
          path: "/deposit-withdraw-report",
          element: <DepositWithdrawReport />,
        },
        {
          path: "/open-bets",
          element: <OpenBets />,
        },
        {
          path: "/betting-profit-loss",
          element: <BettingProfitLoss />,
        },
        {
          path: "betting-profit-loss/:marketId",
          element: <SingleProfitLoss />,
        },
        {
          path: "/my-bank-details",
          element: <MyBankDetails />,
        },
        {
          path: "/bonus-statement",
          element: <BonusStatement />,
        },
        {
          path: "/referral-statement",
          element: <ReferralStatement />,
        },
        {
          path: "/change-password",
          element: <ChangePassword />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },

    {
      path: "/edit-stake",
      element: <StakeSetting />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL ?? "/",
  }
);
