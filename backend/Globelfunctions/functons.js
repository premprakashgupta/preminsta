const jsonMsgHandler=(res,status,data,error,msg)=>{
    res.status(status).json({
        data,
        error,
        msg
    })
    
}

module.exports=jsonMsgHandler;