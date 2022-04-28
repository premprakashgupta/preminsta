import React from 'react'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './LoginSlide.css'

const fadeImages = [
    "/image/firstSlide.png",
    "/image/secondSlide.png",
    "/image/thirdSlide.png"
    ];

function LoginSlide() {
 


  return (
    <div className="slide-container">
    <Fade>
      <div className="each-fade">
        <img src={fadeImages[0]} />
      </div>
      <div className="each-fade">
        <img src={fadeImages[1]} />
      </div>
      <div className="each-fade">
        <img src={fadeImages[2]} />
      </div>
    </Fade>
  </div>
  )
}

export default LoginSlide