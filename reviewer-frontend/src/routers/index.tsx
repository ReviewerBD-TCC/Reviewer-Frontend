import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Indication from "../pages/Indicacation/Indication";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
      },
    {
        path: "/indication",
        element: <Indication/>,
    },

  ]);