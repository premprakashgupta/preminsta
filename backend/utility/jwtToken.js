const cookieImplement=(data,statusCode,msg,res)=>{
    const token=data.generateToken();
    const options={
        expires: new Date(
            Date.now()+process.env.JWT_EXP *24*60*60*1000
        ),
        httpOnly: true
    }
    res.status(statusCode).cookie('token',token,options).json({
        data:data,
        error:false,
        msg
    })
}

module.exports=cookieImplement;