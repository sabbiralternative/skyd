import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { Settings } from "../../api";
import { setUser } from "../../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import images from "../../assets/images";
import { useLogo } from "../../context/ApiProvider";

const Login = () => {
  const { logo } = useLogo();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [handleLogin] = useLoginMutation();
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ username, password }) => {
    const loginData = {
      username: username,
      password: password,
      b2c: Settings.b2c,
    };
    const result = await handleLogin(loginData).unwrap();

    if (result.success) {
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;
      const memberId = result?.result?.memberId;
      dispatch(setUser({ user, token }));
      localStorage.setItem("memberId", memberId);
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("token", token);
      localStorage.setItem("bonusToken", bonusToken);
      if (result?.result?.changePassword) {
        navigate("/change-password");
      } else {
        navigate("/");
        toast.success("Login successful");
      }
    } else {
      toast.error(result?.error);
    }
  };

  /* handle login demo user */
  const loginWithDemo = async () => {
    /* Random token generator */
    /* Encrypted the post data */
    const loginData = {
      username: "demo",
      password: "",
      b2c: Settings.b2c,
    };
    const result = await handleLogin(loginData).unwrap();

    if (result.success) {
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;

      dispatch(setUser({ user, token }));
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("token", token);
      localStorage.setItem("bonusToken", bonusToken);
      navigate("/");
      toast.success("Login successful");
    } else {
      toast.error(result?.error);
    }
  };

  return (
    <div
      data-role="page"
      className="ui-page ui-page-theme-a ui-page-active login"
    >
      <header className="login-head">
        <Link to="/" className="close ui-link"></Link>
        <h1 style={{ backgroundImage: `url(${logo})` }}>SKYEXCHANGE</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="form-login">
        <dd id="loginNameErrorClass">
          <input
            style={{ width: "100%", padding: "5px", color: "black" }}
            {...register("username", { required: true })}
            type="text"
            placeholder="Mobile/Username"
          />
        </dd>
        <dd id="passwordErrorClass">
          <input
            style={{ width: "100%", padding: "5px", color: "black" }}
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
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
            Login
          </button>
        </dd>
        {Settings.demoLogin && (
          <dd>
            <button
              onClick={loginWithDemo}
              type="button"
              style={{ width: "100%" }}
              className="btn-send ui-link"
              id="loginBtn"
            >
              Demo Login
            </button>
          </dd>
        )}
        {Settings.registration && (
          <dd>
            <button
              onClick={loginWithDemo}
              type="button"
              style={{ width: "100%" }}
              className="btn-send ui-link"
              id="loginBtn"
            >
              Registration
            </button>
          </dd>
        )}
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

export default Login;
