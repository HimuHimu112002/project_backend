const mongoose = require('mongoose');
const DataShema = mongoose.Schema({
    productID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    color:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    qty:{
        type: String,
        required: true,
    },
    size:{
        type: String,
        required: true,
    }

},
{timestamps: true, versionKey: false}
);
const cartsModel = mongoose.model('cart', DataShema);
module.exports = cartsModel