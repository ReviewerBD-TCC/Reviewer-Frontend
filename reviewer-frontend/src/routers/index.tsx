import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register";
import Indication from "../pages/Indicacation/Indication";
import QuestionDb from "../pages/QuestionDb/QuestionDb";
import CreateForms from "../pages/CreateForms/CreateForms";

export const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register/>,
      },
    {
        path: "/indication",
        element: <Indication/>,
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