import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import images from "../../assets/images";
import { useLogo } from "../../context/ApiProvider";

const ChangePassword = () => {
  const { logo } = useLogo();
  const navigate = useNavigate();
  const [handleChangePassword] = useChangePasswordMutation();

  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ password, newPassword, newPasswordConfirm }) => {
    const payload = {
      oldPassword: password,
      password: newPassword,
      passVerify: newPasswordConfirm,
    };
    const data = await handleChangePassword(payload);
    if (data.success) {
      toast.success(data?.result?.message);
      localStorage.clear();
      navigate("/login");
    } else {
      toast.error(data?.error?.oldPassword[0]?.description);
    }
  };

  return (
    <div data-role="page" className="ui-page ui-page-theme-a ui-page-active">
      <header className="login-head">
        <Link to="/" className="close ui-link"></Link>
        <h1 style={{ backgroundImage: `url(${logo})` }}>SKYEXCHANGE</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="form-login">
        <dd id="passwordErrorClass">
          <input
            style={{ width: "100%", padding: "5px", color: "black" }}
            {...register("password", { required: true })}
            type="password"
            placeholder="Enter Old Password"
          />
        </dd>
        <dd id="passwordErrorClass">
          <input
            style={{ width: "100%", padding: "5px", color: "black" }}
            {...register("newPassword", {
              required: true,
            })}
            type="password"
            placeholder="Enter New Password"
          />
        </dd>
        <dd id="passwordErrorClass">
          <input
            style={{ width: "100%", padding: "5px", color: "black" }}
            {...register("newPasswordConfirm", {
              required: true,
            })}
            type="password"
            placeholder="Enter Confirm Password"
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            <Link
              to="/forgot-password"
              style={{
                textDecoration: "underline",
                color: "black",
                marginTop: "3px",
              }}
            >
              Forgot Password?
            </Link>
          </div>
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

export default ChangePassword;
