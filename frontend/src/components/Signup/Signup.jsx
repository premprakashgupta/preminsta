import { Facebook, Refresh } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import './Signup.css'
import {isEmail,isStrongPassword,isLength} from 'validator'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { registerAction } from '../../actions/userAction'
function Signup() {
    const [type,setType]=useState("password")
    const [disable,setDisable]=useState(true)
    const [email,setEmail]=useState(["","/image/transparent.png",false,"Mobile number, or email",""])
    const [fullname,setFullname]=useState(["","/image/transparent.png",false,"Fullname",""])
    const [username,setUsername]=useState(["Generate Username",false])
    const [password,setPassword]=useState(["","/image/transparent.png",false,"Password",""])
    const [usernameLoader,setUsernameLoader]=useState("")
    const {loading}=useSelector(state=>state.Detail)

    useEffect(() => {
      setDisable(email[2] && username[1] && fullname[2] && password[2] ? false : true)
    }, [email,username,fullname,password])

    // random number function ------------
    var RandomNum=function(length){
        return Math.floor(Math.random()*(length-2))
    }

    // generate username --------------------------
const handleGenerateUsername =()=>{
        setUsernameLoader("rotate");
        var numberString="1234567890";
        if(!fullname[2])
        {
            setTimeout(() => {
                
                setUsernameLoader("");setFullname(["","/image/cross.png",false,"Fullname Required","red"]);
            }, 2000);
            return false;
            
        }
        var newName=fullname[0].slice(0,Math.floor(Math.random()*(fullname[0].length - 3 +1) + 3));
        
        var generateString="";
        for (let index = 1; index < 5; index++) {
            
            generateString+=numberString[RandomNum(numberString.length)];
        }
        newName=newName+"_"+generateString;
        setTimeout(() => {
            setUsername([newName,true])
            setUsernameLoader("") 
        }, 3000);
        
}
const dispatch=useDispatch();
const handleregister =(e)=>{
    e.preventDefault();
    dispatch(registerAction(fullname[0],username[0],email[0],password[0]))
    setDisable(loading)
}


  return (


    <>

<div className='SignContainer'>
        <div className="SignInnerContainer">
        <div className="rightDiv">
            <form className='form'>
                <div className="logo"><img src="/image/instagram_logo.png" alt="" /></div>
                <p>Sign up to see photos and videos from your friends.</p>
                <div className='SignupFacebook' >
                <Link to="#"> <Facebook/> <span>Log in with Facebook</span></Link>

                </div>
                <span className="lineBox"><span className='line'></span><span className='or' >or</span></span>
                <div className="form-group">
                <div className="user-input-wrp">
                
                <input type="text" className="inputText" onChange={e=> isEmail(e.target.value) ||(e.target.value).match('[0-9]{10}') ? setEmail([e.target.value,"/image/check.png",true,"Mobile number, or email","green"]) : setEmail([e.target.value,"/image/cross.png",false,"Invalid Email or Mobile","red"])} required/>
                <span style={{color: email[4]}} className="floating-label">{email[3]}</span>
                </div>
                <div className="validation">
                    
                <img src={email[1]} alt="" />
                </div>
                </div>
                <div className="form-group">
                <div className="user-input-wrp">
                
                <input type="text" className="inputText" onChange={e=>isLength(e.target.value,{min:4, max: 20}) ? setFullname([e.target.value,"/image/check.png",true,"Fullname","green"]) : setFullname([e.target.value,"/image/cross.png",false,"Fullname Allow","red"])} required/>
                <span style={{color: fullname[4]}} className="floating-label">{fullname[3]}</span>
                </div>
                <div className="validation">
                    
                <img src={fullname[1]} alt="" />
                </div>
                </div>
                <div className="form-group">
                <div className="user-input-wrp">
                
                <input type="text" className="inputText" disabled  required/>
                <span className="floating-label">{username[0]}</span>
                </div>
                <div className={`validation username ${usernameLoader}`} title="Click For Username, Fullname is required" onClick={handleGenerateUsername}>
                    <Refresh style={{color:"green",cursor:"pointer"}} />
                </div>
                </div>
                <div className="form-group">
                <div className="user-input-wrp">
                
                <input type={type} className="inputText" onChange={e=> isStrongPassword(e.target.value) ? setPassword([e.target.value,"/image/check.png",true,"Password","green"]) :setPassword([e.target.value,"/image/cross.png",false,"Weak Password","red"])} required/>
                <span style={{color: password[4]}} className="floating-label">{password[3]}</span>
                </div>
                <div className="validation">
                    
                <img src={password[1]} alt="" />
                </div>
                <span className='show_and_hide' onClick={()=>setType(type==="password"? "text": "password")} >{type==="password" ? "Show": "Hide"}</span>
                </div>
                <div className="form-group">
                <input type="submit" value="Sign up" className={loading && "loading"} disabled={disable} onClick={handleregister} />
                </div>

               
                
                <div className='ForgotPassword' >
                <p>By signing up, you agree to our Terms , Data Policy and Cookies Policy</p>

                </div>
            </form>
            <div className="signUpBox">
             <p>Have an account? <Link to="/accounts/login">Log In</Link> </p>   
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
            <span><a href="#">meta</a></span>
            <span><a href="#">blog</a></span>
            <span><a href="#">about</a></span>
            <span><a href="#">jobs</a></span>
            <span><a href="#">help</a></span>
            <span><a href="#">API</a></span>
            <span><a href="#">privacy</a></span>
            <span><a href="#">top account</a></span>
            <span><a href="#">terms</a></span>
            <span><a href="#">hashtag</a></span>
            <span><a href="#">location</a></span>
            <span><a href="#">dance</a></span>
            <span><a href="#">food and drink</a></span>
            <span><a href="#">home and garden</a></span>
            <span><a href="#">music</a></span>
            <span><a href="#">visual arts</a></span>
        </div>
    </div>

    </>
  )
}

export default Signup