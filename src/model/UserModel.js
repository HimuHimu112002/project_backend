const mongoose = require('mongoose');
const DataShema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    otp:{
        type: String,
        required: true,
    },
    
},
{timestamps: true, versionKey: false}
);
const UserModel = mongoose.model('user', DataShema);
module.exports = UserModel