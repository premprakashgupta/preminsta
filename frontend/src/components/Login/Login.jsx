import { Facebook } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginSlide from "../LoginSlide/LoginSlide";
import "./Login.css";
import { isEmail, isNumeric } from "validator";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../actions/userAction";
import {useAlert} from 'react-alert'

function Login() {
  const [type, setType] = useState("password");
  const [email_username_mobile, setEmail_Username_Mobile] = useState({});
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert=useAlert()

  const handleEmail_Username_Mobile = (arg) => {
    if (isEmail(arg)) {
      setEmail_Username_Mobile({ email: arg });
    } else if (isNumeric(arg)) {
      setEmail_Username_Mobile({ mobile: arg });
    } else {
      setEmail_Username_Mobile({ userId: arg });
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (Object.keys(email_username_mobile).length < 1 || password == "") {
      return alert("All field is required");
    }

    dispatch(loginAction(email_username_mobile, password));
  };
  const { loading,msg,error } = useSelector((state) => state.Detail);

  useEffect(() => {
    !error && !loading && msg && alert.success(msg);
    error && msg && alert.error(msg);
    loading && msg && alert.show(msg)
  }, [msg,error,loading])
  
  return (
    <div className="LoginContainer">
      <div className="LoginInnerContainer">
        <div className="leftDiv">
          <div className="content">
            <img src="/image/43cc71bb1b43.png" alt="" />
          </div>
          <div className="slides">
            <LoginSlide />
          </div>
        </div>
        <div className="rightDiv">
          <form className="form">
            <div className="logo">
              <img src="/image/instagram_logo.png" alt="" />
            </div>
            <div className="form-group">
              <div className="user-input-wrp">
                <input
                  type="text"
                  className="inputText"
                  onChange={(e) => handleEmail_Username_Mobile(e.target.value)}
                  required
                />
                <span className="floating-label">
                  Phone number,username, or email
                </span>
              </div>
            </div>
            <div className="form-group">
              <div className="user-input-wrp">
                <input
                  type={type}
                  className="inputText"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="floating-label">Password</span>
              </div>
              <span
                className="show_and_hide"
                onClick={() =>
                  setType(type === "password" ? "text" : "password")
                }
              >
                {type === "password" ? "Show" : "Hide"}
              </span>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value={loading ? "" : "Log In"}
                onClick={handleLogin}
                disabled={loading}
              />
            </div>

            <span className="lineBox">
              <span className="line"></span>
              <span className="or">or</span>
            </span>
            <div className="LogInFacebook">
              <Link to="#">
                 
                <Facebook /> <span>Log in with Facebook</span>
              </Link>
            </div>
            <div className="ForgotPassword">
              <a href="#" target="_blank">
                Forgot password?
              </a>
            </div>
          </form>
          <div className="signUpBox">
            <p>
              Don't have an account? 
              <Link to="/accounts/emailsignup">Sign up</Link> 
            </p>
          </div>
          <div className="getTheApp">
            <p>Get the App</p>
            <div className="content">
              <img src="/image/appstore.png" alt="" />
              <img src="/image/googleplay.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="information">
        <a href="#">meta</a>
        <a href="#">blog</a>
        <a href="#">about</a>
        <a href="#">jobs</a>
        <a href="#">help</a>
        <a href="#">API</a>
        <a href="#">privacy</a>
        <a href="#">top account</a>
        <a href="#">terms</a>
        <a href="#">hashtag</a>
        <a href="#">location</a>
        <a href="#">dance</a>
        <a href="#">food and drink</a>
        <a href="#">home and garden</a>
        <a href="#">music</a>
        <a href="#">visual arts</a>
      </div>
    </div>
  );
}

export default Login;
