const mongoose = require('mongoose');
const DataShema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    productID:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    ],
   
},
{timestamps: true, versionKey: false}
);
const productslidersModel = mongoose.model('productslider', DataShema);
module.exports = productslidersModel