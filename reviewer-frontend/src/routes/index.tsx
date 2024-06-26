import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register";
import Indication from "../pages/Indicacation/Indication";
import QuestionDb from "../pages/QuestionDb/QuestionDb";
import { CreateForms } from "../pages/CreateForms/CreateForms";
import {Login} from "../pages/Login/Login";
import { Homepage } from "../pages/Homepage/Homepage";
import EmailIndicationUser from "pages/EmailIndicationUser/EmailIndicationUser";
import Form from "pages/Form/Form";
import { PrivateRoute } from "components";
import { AllForms } from "pages/AllForms/AllForms";
import { Confirmation } from "pages/Confirmation/Confirmation";
import { SingleForm } from "pages/SingleForm/SingleForm";
import ResponseDashboard from "pages/Dashboard/UserDashboard";
import Dashboard from "pages/Dashboard/Dashboard";
import { Notfound } from "pages/NotFound/Notfound";
import { NotfoundUser } from "pages/NotFound/NotFoundUser";

export const route = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Login />
    )
  },
  // {
  //   path: "/register",
  //   element: (
   
  //       <Register />
 
  //   )
  // },
  {

    path: "/indication",
    element: (
      // <PrivateRoute>
        <Indication />
      // </PrivateRoute>
    ),
  },
  {
    path: "/",
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
    path: "/form/:formId/:userId/",
    element: (
      <PrivateRoute>
        <Form />
      </PrivateRoute>
    )
  },
  {

    path: "/dashboard/response-dashboard/:formId/:userId",
    element: (
      <PrivateRoute>
        <ResponseDashboard/>
      </PrivateRoute>
      )
     },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard/>
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
  },
  {
    path: '*',
    element: <Notfound/>
  },
  {
    path: '/unauthorized',
    element: <NotfoundUser/>
  }
]);

export default function AppRoutes() {
  return (
    <RouterProvider router={route} />
  );
}