import React, { useEffect, useState } from "react";
import "./Navbar.css";

import {
  BookmarkBorderOutlined,
  CachedOutlined,
  PersonOutlineOutlined,
  Search,
  SettingsOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import Upload from "../Upload/Upload";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../actions/userAction";

function Navbar() {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.Detail);

  const [Boxshow, setBoxShow] = useState(false);
  const [menu, setMenu] = useState(false);
  const handleChange = () => {
    setBoxShow(false);
  };
  return (
    <>
      <header>
        <div className="navbar">
          <nav>
            <div className="logo">
              <img src="/image/instagram_logo.png" alt="" />
            </div>
            <div className="search_bar">
              <Search />
              <input type="search" placeholder="Search" />
            </div>
            <div className="menu_section">
              {userDetail?.userId ? (
                <ul>
                  <li>
                    <Link to="/">
                      <img src="/image/home.png" alt="home icon" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="/image/msg.png" alt="message icon" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="/image/compass.png" alt="compass" />
                    </Link>
                  </li>
                  <li onClick={() => setBoxShow(true)}>
                    <Link to="#">
                      <img src="/image/upload.png" alt="upload" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="/image/heart.png" alt="heart icon" />
                    </Link>
                  </li>
                  <li onClick={() => setMenu(menu ? false : true)}>
                    <img src={userDetail.profilePic} alt="" />
                    {menu && (
                      <ul className="profile_section">
                        <li>
                          <PersonOutlineOutlined />
                          <Link
                            to={`accounts/${userDetail?.userId}`}
                            
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <BookmarkBorderOutlined /> <a href="#">Saved</a>
                        </li>
                        <li>
                          <SettingsOutlined />
                          <a href="#">Setting</a>
                        </li>
                        <li>
                          <CachedOutlined />
                          <a href="#">Switch Account</a>
                        </li>
                        <li>
                          <Link to="#" onClick={() => dispatch(logoutAction())}>
                            Log out
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              ) : (
                <ul className="signup_login">
                  <Link to="/">Log In</Link>
                  <Link to="/accounts/emailsignup">Sign up</Link>
                </ul>
              )}
            </div>
          </nav>
        </div>
        {Boxshow && (
          <Upload
            profilePic={userDetail.profilePic}
            username={userDetail.username}
            onChange={handleChange}
          />
        )}
      </header>
    </>
  );
}

export default Navbar;
