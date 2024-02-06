const mongoose = require('mongoose');
const DataShema = mongoose.Schema({
    brandName:{
        type: String,
        unique: true,
        required: true
    },
    brandImg:{
        type: String,
        required: true,
    },
    brandid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
},
{timestamps: true, versionKey: false}
);
const BrandModel = mongoose.model('brand', DataShema);
module.exports = BrandModel