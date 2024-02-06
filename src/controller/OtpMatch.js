const { Db } = require("mongodb");
const UserModel = require("../model/UserModel");
const { EncodeToken } = require("../utility/TokenHelper");

let OtpMatchController = async (req, res)=>{
    try {
        let email=req.params.email;
        let otp=req.params.otp;
        // User Count
        let total=await UserModel.find({email:email,otp:otp}).count('total');
        if(total===1){

            // User ID Read
            let user_id=await UserModel.find({email:email,otp:otp}).select('_id');
            // User Token Create
            let token=EncodeToken(email,user_id[0]['_id'].toString())
            
            // OTP Code Update To 0
            await UserModel.updateOne({email:email},{$set:{otp:"0"}})
            // set cookie
            let id = user_id[0]
            let cookieOptin = {expires:new Date(Date.now()+24*6060*1000), httpOnly:false}
            res.cookie('token',token)
            res.send({status:"success", message:"Valid OTP",token:token, user_id:id})

        }
        else{
            res.send({status:"fail", message:"Invalid OTP"})
        }

    }catch (e) {
        return {status:"fail", message:"Invalid OTP"}
    }

}

const UserLogout = async(req, res)=>{
    let cookieOptin = {expires:new Date(Date.now()-24*6060*1000), httpOnly:false}
    res.cookies('token',"",cookieOptin)
    res.send({status: "success"})
}

module.exports = {OtpMatchController,UserLogout}