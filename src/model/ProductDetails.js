const mongoose = require('mongoose');
const DataShema = mongoose.Schema({
    img1:{
        type: String,
        required: true
    },
    img2:{
        type: String,
        required: true
    },
    img3:{
        type: String,
        required: true
    },
    img4:{
        type: String,
    },
    img5:{
        type: String,
    },
    description:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    productID:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
   
},
{timestamps: true, versionKey: false}
);

const ProductDetailModel = mongoose.model('ProductDetail', DataShema);
module.exports = ProductDetailModel