import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home.jsx";
import Main from "../components/Main.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import Posts from "../Pages/Posts/Posts.jsx";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout.jsx";
import Services from "../Pages/services/Services.jsx";
import AboutUs from "../Pages/aboutUs/AboutUs.jsx";
import ContactUs from "../Pages/ContactUs/ContactUs.jsx";
import DashboardHome from "../Pages/Dashboard/DashboardHome.jsx";
import MyPosts from "../Pages/Dashboard/User/MyPosts.jsx";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers.jsx";
import ProfileSettings from "../Pages/Dashboard/Shared/ProfileSettings.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import CreatePost from "../Pages/Dashboard/User/CreatePost.jsx";
import MyOrders from "../Pages/Dashboard/User/MyOrders.jsx";
import MyWishlist from "../Pages/Dashboard/User/MyWishlist.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/all-posts",
        element: <Posts></Posts>,
      },
      {
        path: "/services",
        Component: Services,
      },
      {
        path: "/about",
        Component: AboutUs,
      },
      {
        path: "/contact",
        Component: ContactUs,
      },
    ],
  },
  {
    path: "/dashboard",
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute> ,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "posts",
        Component: MyPosts,
      },
      {
        path: "create-post",
        Component:CreatePost,
      },
      {
        path: "my-orders",
        Component:MyOrders,
      },
      {
        path: "my-wishlist",
        Component:MyWishlist,
      },
      {
        path: "manage-users",
        Component: ManageUsers,
      },
      {
        path: "settings",
        Component: ProfileSettings,
      },
    ],
  },
]);

export default Router;
