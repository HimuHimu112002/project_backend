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
    description:{
        type: String,
        required: true,
    },
    rating:{
        type: String,
        required: true,
    },

},
{timestamps: true, versionKey: false}
);
const ReviewModel = mongoose.model('review', DataShema);
module.exports = ReviewModel