import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import TodoApp from "./pages/TodoApp";
import ForgetPasswordForm from "./component/Auth/ForgetPasswordForm";
import RegisterForm from "./component/Auth/RegisterForm";
import LoginPage from "./component/Auth/LoginForm";
import UserRoutes from "./ProtectedRoute/UserRoutes";
import AuthRoutes from "./ProtectedRoute/AuthRoutes";
import ProfilePage from "./component/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<HomePage />}>
          <Route
            index
            element={
              <AuthRoutes>
                <LoginPage />
              </AuthRoutes>
            }
          />
          <Route
            path="register"
            element={
              <AuthRoutes>
                <RegisterForm />
              </AuthRoutes>
            }
          />
          <Route path="forgot-password" element={<ForgetPasswordForm />} />
        </Route>
        <Route
          path="/todo"
          element={
            <UserRoutes>
              <TodoApp />
            </UserRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <UserRoutes>
              <ProfilePage />
            </UserRoutes>
          }
        />
      </Route>
    )
  );

  return (
    <>
      <ToastContainer position="top-center" autoClose={1000} />
      <RouterProvider router={router} />;
    </>
  );
};

export default App;
