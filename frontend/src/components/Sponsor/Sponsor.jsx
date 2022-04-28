import React, { useEffect, useState } from "react";
import "./Sponsor.css";

import posts from "../../Postdata";
import { FavoriteOutlined } from "@material-ui/icons";

import { Link } from "react-router-dom";
function Sponsor() {
  //     heart add---------------------------------
  const handleGlowHeart = (id) => {
    var gleowHeart = document.getElementById(id);
    gleowHeart.lastChild.classList.add("glowheart");
    setTimeout(() => {
      gleowHeart.lastChild.classList.remove("glowheart");
    }, 800);
  };
  return (
    <>
      <section className="sponsorSection">
        <div className="post_section">
          {posts?.map((element) => (
            <div className="post_collection" key={element._id}>
              <div className="head_section">
                <span>
                  <div className="head_pic">
                    <img src={element?.postOwnerPic} alt="" />
                  </div>
                  <span className="head_name">
                    <Link to="#">{element?.postOwnerName}</Link>
                  </span>
                </span>
                <div className="three_dot">...</div>
              </div>
              <div
                className="post_content"
                id={element._id}
                onClick={() => handleGlowHeart(element._id)}
              >
                <img src={element?.postPic} alt="post image" />
                <span>
                  <FavoriteOutlined />
                </span>
              </div>
            </div>
          ))}

          {/* <!--           post end-----------------------------------> */}
        </div>
      </section>
    </>
  );
}

export default Sponsor;
