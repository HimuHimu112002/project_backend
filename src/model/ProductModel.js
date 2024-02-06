const mongoose = require('mongoose');
const DataShema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    shortDes:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    discount:{
        type: String,
        required: true
    },
    discountPrice:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    star:{
        type: String,
        required: true
    },
    stock:{
        type: String,
        required: true
    },
    remark:{
        type: String,
        required: true
    },
    categoryID:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    ],
    brandID:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:  "brand"
        }
    ]
},

{timestamps: true, versionKey: false}
);
module.exports = mongoose.model('Product', DataShema);
