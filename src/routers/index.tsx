import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register";
import Indication from "../pages/Indicacation/Indication";
import QuestionDb from "../pages/QuestionDb/QuestionDb";
import CreateForms from "../pages/CreateForms/CreateForms";
import Login from "../pages/Login/Login";


import { Homepage } from "../pages/Homepage/Homepage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/indication",
      element: <Indication/>,
    },
    {
      path: "/home",
      element: <Homepage/>,
    },
    {
      path: "/questions",
      element: <QuestionDb/>
    },
    {
      path: "/createform",
      element: <CreateForms/>
    }
  ]);