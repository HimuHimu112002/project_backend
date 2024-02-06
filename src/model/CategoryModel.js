const mongoose = require('mongoose');
const DataShema = mongoose.Schema({
    categoryName:{
        type: String,
        unique: true,
        required: true,
    },
    categoryImg:{
        type: String,
        required: true,
    },
    categoryid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
},
{timestamps: true, versionKey: false} 
);
module.exports = mongoose.model('Category', DataShema); 
