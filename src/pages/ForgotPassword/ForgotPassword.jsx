import {
  useForgotPasswordMutation,
  useGetOtpMutation,
} from "../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { Settings } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import images from "../../assets/images";
import { useLogo } from "../../context/ApiProvider";
import { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { logo } = useLogo();
  const [handleForgotPassword] = useForgotPasswordMutation();
  const [mobile, setMobile] = useState("");
  const [OTP, setOTP] = useState({});
  const [getOTP] = useGetOtpMutation();
  const { register, handleSubmit } = useForm();

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
    <div data-role="page" className="ui-page ui-page-theme-a ui-page-active">
      <header className="login-head">
        <Link to="/" className="close ui-link"></Link>
        <h1 style={{ backgroundImage: `url(${logo})` }}>SKYEXCHANGE</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="form-login">
        <dd id="loginNameErrorClass" style={{ position: "relative" }}>
          <input
            style={{ width: "100%", padding: "5px", color: "black" }}
            onChange={(e) => handleMobileInputChange(e)}
            type="text"
            placeholder="Mobile Number"
          />
          <button
            type="button"
            onClick={handleOTP}
            style={{
              position: "absolute",
              right: "0px",
              top: "0px",
              background: "black",
              borderRadius: "3px",
              padding: "5px 5px",
            }}
          >
            Get OTP
          </button>
        </dd>
        <dd id="passwordErrorClass">
          <input
            style={{ width: "100%", padding: "5px", color: "black" }}
            {...register("otp", { required: true })}
            type="text"
            placeholder="Enter Your OTP"
          />
        </dd>
        <dd id="passwordErrorClass">
          <input
            style={{ width: "100%", padding: "5px", color: "black" }}
            {...register("password", { required: true })}
            type="password"
            placeholder="Enter Your Password"
          />
        </dd>
        <dd id="passwordErrorClass">
          <input
            style={{ width: "100%", padding: "5px", color: "black" }}
            {...register("confirmPassword", { required: true })}
            type="password"
            placeholder="Enter Confirm Password"
          />
        </dd>

        <dd>
          <button
            type="submit"
            style={{ width: "100%" }}
            className="btn-send ui-link"
            id="loginBtn"
          >
            Change Password
          </button>
        </dd>
      </form>

      <ul className="policy-link" style={{ display: "block" }}>
        <li>
          <a className="ui-link">Privacy Policy</a>
        </li>
        <li>
          <a className="ui-link">Terms and Conditions</a>
        </li>
        <li>
          <a className="ui-link">Rules and Regulations</a>
        </li>
        <li>
          <a className="ui-link">KYC</a>
        </li>
        <li>
          <a className="ui-link">Responsible Gaming</a>
        </li>
        <li>
          <a className="ui-link">About Us</a>
        </li>
        <li>
          <a className="ui-link">Self-Exclusion Policy</a>
        </li>
        <li>
          <a className="ui-link">Underage Policy</a>
        </li>
      </ul>
      <div className="support-wrap extend-support">
        <div style={{ display: "flex" }} className="extend-btn">
          <img
            src={images.transparent}
            title="customer"
            className="support-customer"
          />

          <a target="_blank" className="ui-link">
            Customer support1
          </a>

          <a target="_blank" className="split-line ui-link">
            support2
          </a>
        </div>
        <div style={{ display: "flex" }} className="extend-btn">
          <img
            src={images.transparent}
            title="WhatsApp"
            className="support-whatsapp"
          />

          <a className="ui-link">WhatsApp 3</a>

          <a className="split-line ui-link">WhatsApp 4</a>
        </div>
        <div className="extend-btn"></div>
        <div className="support-social">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
            className="social-btn"
          >
            <img
              src={images.transparent}
              title="Skype"
              className="support-skype"
            />
            <a className="ui-link">Skype</a>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
            className="social-btn"
          >
            <img
              src={images.transparent}
              title="Email"
              className="support-mail"
            />
            <a className="ui-link">Email</a>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
            className="social-btn"
          >
            <img
              src={images.transparent}
              title="Instagram"
              className="support-ig"
            />

            <a className="ui-link">skyexchindia</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
