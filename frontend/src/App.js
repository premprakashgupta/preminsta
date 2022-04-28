import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Upload from "./components/Upload/Upload";
import store from "./store";
import { loadUserDetailAction } from "./actions/userAction";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PageNotFound from "./components/PageNotFound/PageNotFound";
function App() {
  const path = window.location.pathname;

  useEffect(() => {
    store.dispatch(loadUserDetailAction());
  }, []);
  const { userDetail } = useSelector((state) => state.Detail);
  const { profile, error } = useSelector((state) => state.profileData);

  return (
    <div className="container-fluid">
      <Router>
        {userDetail?.userId || profile._id || error ? <Navbar /> : ""}
        <Routes>
          <Route
            exact
            path="/"
            element={userDetail?.userId ? <Home /> : <Login />}
          ></Route>
          <Route
            exact
            path="/accounts/emailsignup"
            element={userDetail?.userId ? <Home /> : <Signup />}
          ></Route>
          <Route
            exact
            path={`/accounts/:${userDetail?.userId}`}
            element={error ? <PageNotFound /> : <Profile />}
          ></Route>
          <Route exact path="/upload" element={<Upload />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
