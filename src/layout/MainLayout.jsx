import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header/Header";
import WhatsApp from "../components/shared/WhatsApp";

const MainLayout = () => {
  return (
    <>
      <WhatsApp />
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
