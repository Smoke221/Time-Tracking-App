

const authorize = (permitedRole)=>{
    return (req,res,next)=>{
        console.log(permitedRole,req.body.role)
         if(permitedRole.includes(req.body.role)){
            next()
         }else{
            res.send({"msg":"unthorized"})
         }
    }
}

module.exports={authorize}