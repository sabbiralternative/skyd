import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Settings } from "../../api";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const showRegister = () => {
      if (location.pathname.includes("/ref/") && Settings.registration) {
        const splitPath = location.pathname.split("/");
        const lastDigit = splitPath[splitPath?.length - 1];
        if (parseFloat(lastDigit)) {
          localStorage.setItem("referralCode", lastDigit);
          navigate("/register");
        }
      }
    };
    showRegister();
  }, [location, navigate]);

  return <Navigate to="/" replace />;
};

export default NotFound;
