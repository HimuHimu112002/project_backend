const EmailSend = require('../utility/EmailTampler');
const UserModel = require("../model/UserModel")
const ProfileModel = require("../model/ProfileModel")

async function UserLogin(req, res){
    try{

        let email=req.params.email;
        
        if(!email){
            res.send({error: "Please Enter Your Email"})
        }else{
            let duplicateEmail = await UserModel.find({email: email})
            if(duplicateEmail.length > 0){
                let code=Math.floor(100000+Math.random()*900000);
                await UserModel.findOneAndUpdate(
                    {email},
                    {$set: {otp:code}},
                    {new: true}     
                )
                EmailSend(email, code)
                res.send({status:"success", message:"6 Digit OTP has been send"})
            }else{
                let code=Math.floor(100000+Math.random()*900000);
                let user = new UserModel({
                    email: email,
                    otp:code
                })
                user.save()
                EmailSend(email, code)
                res.send({status:"success", message:"6 Digit OTP has been send"})
            }
            
        }
    }catch(e){
        res.send({status:"fail", message:"Something Went Wrong",e})
    }
    
}

// async function UserGet(req, res){
//     try{

//         let email=req.params.email;
        
//         if(!email){
//             res.send({error: "Please Enter Your Email"})
//         }else{
//             let duplicateEmail = await UserModel.find({email: email})
//             if(duplicateEmail.length > 0){
//                 let code=Math.floor(100000+Math.random()*900000);
//                 await UserModel.findOneAndUpdate(
//                     {email},
//                     {$set: {otp:code}},
//                     {new: true}     
//                 )
//                 EmailSend(email, code)
//                 res.send({status:"success", message:"6 Digit OTP has been send"})
//             }else{
//                 let code=Math.floor(100000+Math.random()*900000);
//                 let user = new UserModel({
//                     email: email,
//                     otp:code
//                 })
//                 user.save()
//                 EmailSend(email, code)
//                 res.send({status:"success", message:"6 Digit OTP has been send"})
//             }
            
//         }
//     }catch(e){
//         res.send({status:"fail", message:"Something Went Wrong",e})
//     }
    
// }

async function UserProfile(req, res){
    try {

        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;
        await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true})
        res.send({status:"success", message:"Profile Save Success"})
    }catch (e) {
        res.send({status:"fail", message:"Something Went Wrong",})
    }

}

async function ReadProfile(req, res){
    try {
        let user_id=req.headers.user_id;
        let result= await ProfileModel.find({userID:user_id})
        res.send({status:"success", data:result})
    }catch (e) {
        res.send({status:"fail", message:"Something Went Wrong"})
    }
}

module.exports = {UserLogin,UserProfile,ReadProfile};