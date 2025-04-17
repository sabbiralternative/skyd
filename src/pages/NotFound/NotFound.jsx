import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Settings } from "../../api";
import { useDispatch } from "react-redux";
import { setShowRegisterModal } from "../../redux/features/global/globalSlice";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const showRegister = () => {
      if (location.pathname.includes("/ref/") && Settings.registration) {
        const splitPath = location.pathname.split("/");
        const lastDigit = splitPath[splitPath?.length - 1];
        if (parseFloat(lastDigit)) {
          localStorage.setItem("referralCode", lastDigit);
          dispatch(setShowRegisterModal(true));
          navigate("/");
        }
      }
    };
    showRegister();
  }, [location, navigate, dispatch]);

  return <Navigate to="/" replace />;
};

export default NotFound;
