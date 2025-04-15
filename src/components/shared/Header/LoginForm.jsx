import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { Settings } from "../../../api";
import { setUser } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginForm = () => {
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
      if (result?.changePassword) {
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
    <ul className="login-wrap">
      <form onSubmit={handleSubmit(onSubmit)}>
        <li className="user error">
          <input
            {...register("username", { required: true })}
            id="loginName"
            type="text"
            placeholder="Mobile/Username"
          />
        </li>
        <li>
          <input
            id="password"
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
          />
        </li>

        <li>
          <button type="submit" id="loginBtn" className="btn-login">
            Login
          </button>
        </li>
        {Settings.demoLogin && (
          <li>
            <button
              onClick={loginWithDemo}
              type="button"
              id="loginBtn"
              className="btn-login"
            >
              Demo
            </button>
          </li>
        )}
        <li>
          <a className="btn-signup">Sign up</a>
        </li>
      </form>
    </ul>
  );
};

export default LoginForm;
