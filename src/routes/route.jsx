import {
    createBrowserRouter,
  } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Errorpage from "../pages/Errorpage";
import Home from "../pages/Home";
import Biodatas from "../pages/Biodatas";
import BioDetails from "../pages/BioDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import EditBio from "../pages/Dashboard/EditBio";
import ViewDetails from "../pages/Dashboard/ViewDetails";
import AllUsers from "../pages/Dashboard/AllUsers";
import AdminRoute from "./AdminRoute";
import UserFavouriteBio from "../pages/Dashboard/UserFavouriteBio";
import Checkout from "../pages/Checkout";
import ApprovedPremium from "../pages/Dashboard/ApprovedPremium";
import ApprovedContactRequest from "../pages/Dashboard/ApprovedContactRequest";
import MyContactRequests from "../pages/Dashboard/MyContactRequests";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard";

const route = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout></HomeLayout>,
      errorElement: <Errorpage></Errorpage>,
      children: [
        {
            path: "/",
            element: <Home></Home>,
        },
        {
            path: "biodata",
            element: <Biodatas></Biodatas>,
            loader: () => fetch("http://localhost:5000/biodata")
        },
        {
            path: "bioDetails/:id",
            element: <PrivateRoute><BioDetails></BioDetails></PrivateRoute>,
            loader: ({ params }) => fetch(`http://localhost:5000/biodata/${params.id}`)
        },
        {
            path: "login",
            element: <Login></Login>,
        },
        {
            path: "register",
            element: <Register></Register>,
        },
        {
            path: "checkout/:biodataId",
            element: <Checkout></Checkout>,
        },
        {
            path: "aboutUs",
            element: <AboutUs></AboutUs>,
        },
        {
            path: "contactUs",
            element: <ContactUs></ContactUs>,
        },
      ]
    },
    {
      path: "dashboard",
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        // Admin
        {
            path: "users",
            element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
        },
        {
            path: "adminDashboard",
            element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>,
        },
        {
            path: "approvedPremium",
            element: <AdminRoute><ApprovedPremium></ApprovedPremium></AdminRoute>,
        },
        {
            path: "approvedContactRequest",
            element: <AdminRoute><ApprovedContactRequest></ApprovedContactRequest></AdminRoute>,
        },
        // Normal Users
        {
           path: "editBio",
           element: <PrivateRoute><EditBio></EditBio></PrivateRoute>,
        },
        {
           path: "viewDetails",
           element: <PrivateRoute><ViewDetails></ViewDetails></PrivateRoute>,
        },
        {
           path: "favourite",
           element: <PrivateRoute><UserFavouriteBio></UserFavouriteBio></PrivateRoute>,
        },
        {
           path: "myContactRequests",
           element: <PrivateRoute><MyContactRequests></MyContactRequests></PrivateRoute>,
        },
        {
           path: "userDashboard",
           element: <PrivateRoute><UserDashboard></UserDashboard></PrivateRoute>,
        },
      ]
    },
  ]);

export default route;