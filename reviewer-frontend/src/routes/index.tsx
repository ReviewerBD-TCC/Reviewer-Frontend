import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register";
import Indication from "../pages/Indicacation/Indication";
import QuestionDb from "../pages/QuestionDb/QuestionDb";
import { CreateForms } from "../pages/CreateForms/CreateForms";
import {Login} from "../pages/Login/Login";
import { Homepage } from "../pages/Homepage/Homepage";
import EmailIndicationUser from "pages/EmailIndicationUser/EmailIndicationUser";
import Form from "pages/Form/Form";
import { Default, PrivateRoute } from "components";
import { AllForms } from "pages/AllForms/AllForms";
import { SingleForm } from "pages/SingleForm/SingleForm";
import { Confirmation } from "pages/Confirmation/Confirmation";
import { PublicRoute } from "components/PublicRoute/PublicRoute";

export const route = createBrowserRouter([
  {
    path: "/",
    element: (
    <PublicRoute>
      <Login />
    </PublicRoute>
    )
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    )
  },
  {

    path: "/indication",
    element: (
      <PrivateRoute>
        <Indication />
      </PrivateRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Homepage />
      </PrivateRoute>
    ),
  },
  {
    path: "/questions",
    element: (
      <PrivateRoute>
        <QuestionDb />
      </PrivateRoute>
    )
  },
  {
    path: "/create-form",
    element: (
      <PrivateRoute>
        <CreateForms />
      </PrivateRoute>
    )
  },
  {
    path: "/send-indication",
    element: (
      <PrivateRoute>
        <EmailIndicationUser />
      </PrivateRoute>
    )
  },
  {
    path: "/form",
    element: (
      <PrivateRoute>
        <Form />
      </PrivateRoute>
    )
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Default/>
      </PrivateRoute>
    )
  },
  {
    path: '/all-forms',
    element: (
      <PrivateRoute>
        <AllForms/>
      </PrivateRoute>
    )
  },
  {
    path: '/all-forms/single-form/:id',
    element: (
      <PrivateRoute>
        <SingleForm/>
      </PrivateRoute>
    )
  },
  {
    path: '/confirmation',
    element: <Confirmation/>
  }
]);

export default function AppRoutes() {
  return (
    <RouterProvider router={route} />
  );
}