import {
  useForgotPasswordMutation,
  useGetOtpMutation,
} from "../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { Settings } from "../../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setShowForgotPasswordModal } from "../../redux/features/global/globalSlice";
import useCloseModalClickOutside from "../../hooks/closeModal";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const forgotRef = useRef();
  const [handleForgotPassword] = useForgotPasswordMutation();
  const [mobile, setMobile] = useState("");
  const [OTP, setOTP] = useState({});
  const [getOTP] = useGetOtpMutation();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setShowForgotPasswordModal(false));
  };

  useCloseModalClickOutside(forgotRef, () => {
    closeModal();
  });

  const handleMobileInputChange = (e) => {
    if (e.target.value.length <= 10) {
      setMobile(e.target.value);
    }
  };
  const handleOTP = async () => {
    if (mobile.length > 0) {
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
    }
  };

  const onSubmit = async (data) => {
    const forgotPasswordData = {
      username: mobile,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      otp: data?.otp,
      isOtpAvailable: Settings.otp,
      orderId: OTP.orderId,
      otpMethod: OTP.otpMethod,
    };

    const result = await handleForgotPassword(forgotPasswordData).unwrap();
    if (result.success) {
      toast.success("Password updated successfully");

      navigate("/");
    } else {
      toast.error(result?.error?.loginName?.[0]?.description);
    }
  };

  return (
    <div id="loginBox" className="overlay" style={{ display: "flex" }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={forgotRef}
        className="dialog-wrap-w login_to_go"
      >
        <div className="kv"></div>
        <dl className="login-panel">
          <dt>Change Password</dt>
          <dd style={{ position: "relative" }}>
            <input
              onChange={(e) => handleMobileInputChange(e)}
              id="loginBoxLoginName"
              type="text"
              placeholder="Mobile Number"
            />
            <button
              onClick={handleOTP}
              type="button"
              style={{
                position: "absolute",
                right: "1px",
                top: "1px",
                background: "var(--bg-primary)",
                color: "white",
                padding: "5px 3px",
                borderRadius: "1px",
                height: "31px",
              }}
            >
              Get OTP
            </button>
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

export default ForgotPassword;
