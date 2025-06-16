import { Outlet } from "react-router-dom";
import TabBar from "../components/layout/TabBar/TabBar";
import useTelegramBackButton from "../hooks/useTelegramBackButton";
import SingleProduct from "../components/common/ProductCard/SingleProduct/SingleProduct";

const MainRoutes = () => {
  useTelegramBackButton();

  return (
    <>
      <div className="main__content">
        <Outlet />
        <SingleProduct />
      </div>
      <TabBar />
    </>
  );
};

export default MainRoutes;
