const CategoryModel = require("../model/CategoryModel")
const ProductModel = require('../model/ProductModel')
const { ProductCategoryList } = require("../services/ProductServices")

async function CreateCategory(req, res) {
    const {categoryName,categoryImg,categoryid} = req.body
    let category = new CategoryModel({
        categoryName,
        categoryImg,
        categoryid
    })   
    category.save()

    await ProductModel.findOneAndUpdate({_id: category.categoryid}, {$push:{categoryID:category._id}}, {new: true})
    res.send({success: "Caterory Created Successfully"})
    
}

async function GetCategoryList(req, res) {
    let result = await ProductCategoryList()
    return res.status(200).json(result)
    
}

module.exports = {CreateCategory,GetCategoryList}