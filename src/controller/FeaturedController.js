const FeaturesModel = require('../model/FeaturesModel')

async function CreateFeatured(req, res) {

    const {name,description,img} = req.body
    let featured = new FeaturesModel({
        name,
        description,
        img
    })   
    featured.save()
    res.send({success: "featured create Successfully"})
    
}

async function GetAllFeaturedList(req, res) {
    try{
        let data = await FeaturesModel.find({})
        res.send({ status: "success", data:data});
      }catch (e){
        res.send({ status: "error", error: e.toString()});
      }

}

module.exports = {CreateFeatured,GetAllFeaturedList}