import { useDispatch } from "react-redux";
import {
  useGetOtpMutation,
  useRegisterMutation,
} from "../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { Settings } from "../../api";
import { setUser } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useBalance from "../../hooks/balance";
import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../hooks/closeModal";
import { setShowRegisterModal } from "../../redux/features/global/globalSlice";
import getOtpOnWhatsapp from "../../utils/getOtpOnWhatsapp";

const Register = () => {
  const registerRef = useRef();
  const navigate = useNavigate();
  const referralCode = localStorage.getItem("referralCode");
  const { refetchBalance } = useBalance();
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState("");
  const [OTP, setOTP] = useState({});
  const [getOTP] = useGetOtpMutation();
  const [handleRegister] = useRegisterMutation();
  const { register, handleSubmit } = useForm();
  const closeModal = () => {
    dispatch(setShowRegisterModal(false));
  };

  useCloseModalClickOutside(registerRef, () => {
    closeModal();
  });

  const handleMobileInputChange = (e) => {
    if (e.target.value.length <= 10) {
      setMobile(e.target.value);
    }
  };
  const handleOTP = async () => {
    const res = await getOTP({ mobile }).unwrap();
    if (res?.success) {
      setOTP({
        orderId: res?.result?.orderId,
        otpMethod: "sms",
      });
      toast.success(res?.result?.message);
    } else {
      toast.error(res?.error?.errorMessage);
    }
  };

  const onSubmit = async (data) => {
    const registerData = {
      username: "",
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      mobile: mobile,
      otp: data?.otp,
      isOtpAvailable: Settings.otp,
      referralCode: referralCode || data?.referralCode,
      orderId: OTP.orderId,
      otpMethod: OTP.otpMethod,
    };

    const result = await handleRegister(registerData).unwrap();
    if (result.success) {
      localStorage.removeItem("referralCode");
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;
      dispatch(setUser({ user, token }));
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("bonusToken", bonusToken);
      if (token && user) {
        refetchBalance();
        navigate("/");
        toast.success("Register successful");
      }
    } else {
      toast.error(result?.error?.description);
    }
  };

  const handleGetOtpOnWhatsapp = async () => {
    await getOtpOnWhatsapp(mobile, setOTP);
  };

  return (
    <div id="loginBox" className="overlay" style={{ display: "flex" }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={registerRef}
        className="dialog-wrap-w login_to_go"
      >
        <div className="kv"></div>
        <dl className="login-panel">
          <dt>Register</dt>
          <dd style={{ position: "relative" }}>
            <input
              onChange={(e) => handleMobileInputChange(e)}
              id="loginBoxLoginName"
              type="text"
              placeholder="Mobile Number"
            />
            <div style={{ position: "absolute", right: "1px", top: "1px" }}>
              <button
                onClick={handleOTP}
                type="button"
                style={{
                  background: "var(--bg-primary)",
                  color: "white",
                  padding: "5px 3px",
                  borderRadius: "1px",
                  height: "31px",
                }}
              >
                Get OTP Message
              </button>
            </div>
            {Settings.otpWhatsapp && (
              <button
                disabled={mobile?.length < 10}
                onClick={handleGetOtpOnWhatsapp}
                type="button"
                style={{
                  background: "var(--bg-primary)",
                  color: "white",
                  padding: "5px 3px",
                  borderRadius: "1px",
                  height: "31px",
                  width: "100%",
                  marginTop: "2px",
                }}
              >
                Get OTP Whatsapp
              </button>
            )}
          </dd>
          <dd>
            <input
              {...register("otp", { required: true })}
              id="loginBoxPassword"
              type="text"
              placeholder="Enter OTP"
            />
          </dd>
          <dd>
            <input
              {...register("password", { required: true })}
              id="loginBoxPassword"
              type="password"
              placeholder="Enter Password"
            />
          </dd>
          <dd>
            <input
              {...register("confirmPassword", { required: true })}
              id="loginBoxPassword"
              type="password"
              placeholder="Enter Confirm Password"
            />
          </dd>
          <dd>
            <input
              defaultValue={referralCode}
              readOnly={referralCode}
              {...register("referralCode")}
              id="loginBoxValidCode"
              type="text"
              placeholder="Enter Referral Code (Optional)"
            />
          </dd>

          <dd>
            <button
              type="submit"
              id="loginBoxLoginBtn"
              style={{ cursor: "pointer" }}
              className="btn-send"
            >
              Register
              <img className="icon-login" src="/images/transparent.gif" />
            </button>
          </dd>
          <dd id="loginBoxErrorMsg" className="error"></dd>
        </dl>
        <a
          onClick={closeModal}
          id="close"
          style={{ cursor: "pointer" }}
          className="close"
        ></a>
      </form>
    </div>
  );
};

export default Register;
