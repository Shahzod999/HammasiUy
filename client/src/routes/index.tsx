import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import MainRoutes from "./MainRoutes";
import Loading from "../components/common/Loading/Loading";
import HomePage from "../pages/Home/HomePage";
import Search from "../pages/Search/Search";
import ProfilePage from "../pages/Profile/ProfilePage";
import Favorite from "../pages/Favorite/Favorite";
import NotFound from "../pages/Service/NotFound/NotFound";
import FilteredPage from "../pages/FilteredPage/FilteredPage";
import MainNewProduct from "../pages/AddNew/MainNewProduct";
import MapPage from "../pages/MapPage/MapPage";
import Companies from "../pages/Companies/Companies";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <MainRoutes />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "favorite",
        element: <Favorite />,
      },
      {
        path: "addNewProduct",
        element: <MainNewProduct />,
      },
      {
        path: "search/:category",
        element: <FilteredPage />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "map",
        element: <MapPage />,
      },
      {
        path: "profile",
        element: <ProtectedRoutes />,
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: "companies",
        element: <Companies />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
