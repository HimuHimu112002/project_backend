const mongoose = require('mongoose');
const DataShema = mongoose.Schema({
    remark:{
        type: String,
        required: true,
    },
    remarkid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
},
{timestamps: true, versionKey: false} 
);
module.exports = mongoose.model('Remark', DataShema);