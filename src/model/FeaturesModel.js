const mongoose = require('mongoose');
const DataShema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    
},
{timestamps: true, versionKey: false}
);
const FeaturesModel = mongoose.model('feature', DataShema);
module.exports = FeaturesModel