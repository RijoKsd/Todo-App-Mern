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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<HomePage />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgetPasswordForm />} />
        </Route>
        <Route path="/todo" element={<TodoApp />}>
          <Route path="/todo" element={<TodoApp />} />,
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
