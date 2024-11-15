const isAuth=(req,res,next)=>{
    if(req.session.isAuth){
        next();
    }else{
        return res.send("expire session login again");
    }
}
const employeeadmin=(req,res,next)=>{
    console.log("employeadmin");
    
    console.log(req.session );
    if(req.session.user.role==="admin" || req.session.user.role==="employee"){

        next();
    }
    else{
        return res.send("you are not employee of this webiste Only employee can access")
    }
    

}
module.exports={isAuth,employeeadmin};