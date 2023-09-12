import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Submissions from "./components/Submissions/Submissions";
import Login from "./pages/Login.page";
import PrivateRoute from "./pages/PrivateRoute.page";
import Signup from "./pages/Signup.page";
import ResetPassword from "./pages/ResetPassword.page";
import ResetPasswordConfirmation from "./pages/ResetPasswordConfirmation.page";
import Home from './pages/Home.page';
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      {/* We are wrapping our whole app with UserProvider so that */}
      {/* our user is accessible through out the app from any page*/}
      <UserProvider>
        <Routes>
          <Route exact path='login' element={<Login />} />
          <Route exact path='signup' element={<Signup />} />
          <Route exact path='reset-password' element={<ResetPassword />} />
          <Route exact path='reset-password-confirm' element={<ResetPasswordConfirmation />} />
          {/* We are protecting our Home Page from unauthenticated */}
          {/* users by wrapping it with PrivateRoute here. */}
          <Route element={<PrivateRoute />}>
            <Route exact path='/' element={<Home />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;