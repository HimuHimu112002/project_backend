const mongoose =require('mongoose');
const ProductModel = require('../model/ProductModel')
const CategoryModel = require('../model/CategoryModel');
const BrandModel = require('../model/BrandModel');
const ProductDetail = require('../model/ProductDetails')
const ProductSlideModel = require('../model/ProductSlideModel')

const ObjectId = mongoose.Types.ObjectId;

const ProductGet = async() =>{
    try {
        let data = await ProductModel.find({}).populate("categoryID").populate("brandID")
        return { status: "success", data:data};
      } catch (e) {
        return { status: "error", error: e.toString()};
      }
}

const ProductCategoryList = async() =>{
  try {
      let data = await CategoryModel.find({}).populate("categoryid")
      return { status: "success", data:data};
    } catch (e){
      return { status: "error", error: e.toString()};
  }
}

const GetProductBrandList = async() =>{
  try {
      let data = await BrandModel.find({}).populate("brandid")
      return { status: "success", data:data};
    } catch (e){
      return { status: "error", error: e.toString()};
  }
}

const GetProductDetails = async(req,res) =>{
  try{

    let ProductID = new ObjectId(req.params.ProductID);
    let MatchStage={$match:{_id:ProductID}}
    let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    let JoinWithDetailsStage={$lookup:{from:"productdetails",localField:"_id",foreignField:"productID",as:"details"}};
    let UnwindBrandStage={$unwind:"$brand"}
    let UnwindCategoryStage={$unwind:"$category"}
    let UnwindDetailsStage={$unwind:"$details"}

    let data= await  ProductModel.aggregate([
      MatchStage, JoinWithBrandStage,JoinWithCategoryStage,JoinWithDetailsStage,
      UnwindBrandStage,UnwindCategoryStage,UnwindDetailsStage,
    ])
      return {status:"success",data:data}
  }catch(e){
    return {status:"fail",data:e}.toString()
  }
  
}

const GetProductSlide = async(req,res) =>{
  try{
    let data = await ProductSlideModel.find({}).populate("productID")
    return { status: "success", data:data};
  }catch (e){
    return { status: "error", error: e.toString()};
  }
}

const GetProductBycategory = async(req,res) =>{
  try {
    let CategoryID = new ObjectId(req.params.CategoryID);
    let MatchStage={$match:{categoryID:CategoryID}}
    let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    let UnwindBrandStage={$unwind:"$brand"}
    let UnwindCategoryStage={$unwind:"$category"}
    let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

    let data= await  ProductModel.aggregate([
      MatchStage, JoinWithBrandStage,JoinWithCategoryStage,
      UnwindBrandStage,UnwindCategoryStage, ProjectionStage
    ])
      return {status:"success",data:data}

    }catch (e) {
      return {status:"fail",data:e}.toString()
    }
}

const GetProductBySimiler = async(req,res) =>{
  try {
    let CategoryID = new ObjectId(req.params.CategoryID);
    let MatchStage={$match:{categoryID:CategoryID}}
    let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    let UnwindBrandStage={$unwind:"$brand"}
    let UnwindCategoryStage={$unwind:"$category"}
    let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

    let data= await  ProductModel.aggregate([
      MatchStage, JoinWithBrandStage,JoinWithCategoryStage,
      UnwindBrandStage,UnwindCategoryStage, ProjectionStage
    ])
      return {status:"success",data:data}

    }catch (e) {
      return {status:"fail",data:e}.toString()
    }
}

const GetProductByKeyword = async(req,res) =>{
  try {
    let SearchRegex = {"$regex":req.params.Keyword, "$options": "i"}
    let SearchParams = [{title:SearchRegex}]
    let SearchQuery = {$or:SearchParams}

    let MatchStage={$match:SearchQuery}
    let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    let UnwindBrandStage={$unwind:"$brand"}
    let UnwindCategoryStage={$unwind:"$category"}
    let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

    let data= await  ProductModel.aggregate([
        MatchStage, JoinWithBrandStage,JoinWithCategoryStage,
        UnwindBrandStage,UnwindCategoryStage, ProjectionStage
    ])
      return {status:"success",data:data}
    }catch (e) {
      return {status:"fail",data:e}.toString()
    }
}

const GetProductByBrand = async(req,res) =>{
  try {
    let BrandID = new ObjectId(req.params.BrangID);
    console.log("Himu222",req.params.BrangID)
    let MatchStage={$match:{brandID:BrandID}}
    let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    let UnwindBrandStage={$unwind:"$brand"}
    let UnwindCategoryStage={$unwind:"$category"}
    let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

    let data= await  ProductModel.aggregate([
        MatchStage, 
        JoinWithBrandStage,
        JoinWithCategoryStage,
        UnwindBrandStage,
        UnwindCategoryStage, 
        ProjectionStage
    ])
      return {status:"success",data:data}
    }catch (e) {
      return {status:"fail",data:e}.toString()
    }
}

const GetProductByRemark = async(req,res) =>{
  try {
    let RemarkID=new ObjectId(req.params.RemarkID);
    console.log(RemarkID)
    let MatchStage={$match:{remark:RemarkID}}
    let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    let UnwindBrandStage={$unwind:"$brand"}
    let UnwindCategoryStage={$unwind:"$category"}
    let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

    let data= await  ProductModel.aggregate([
        MatchStage, JoinWithBrandStage,JoinWithCategoryStage,
        UnwindBrandStage,UnwindCategoryStage, ProjectionStage
    ])
      return {status:"success",data:data}
    }catch (e) {
      return {status:"fail",data:e}.toString()
    }
}

const ListByFilterService = async (req) => {
  try {

      let matchConditions = {};
      if (req.body['categoryID']) {
          matchConditions.categoryID = new ObjectId(req.body['categoryID']);
      }
      if (req.body['brandID']) {
          matchConditions.brandID = new ObjectId(req.body['brandID']);
      }
      let MatchStage = { $match: matchConditions };


      let AddFieldsStage = {
          $addFields: { numericPrice: { $toInt: "$price" }}
      };
      let priceMin = parseInt(req.body['priceMin']);
      let priceMax = parseInt(req.body['priceMax']);
      let PriceMatchConditions = {};
      if (!isNaN(priceMin)) {
          PriceMatchConditions['numericPrice'] = { $gte: priceMin };
      }
      if (!isNaN(priceMax)) {
          PriceMatchConditions['numericPrice'] = { ...(PriceMatchConditions['numericPrice'] || {}), $lte: priceMax };
      }
      let PriceMatchStage = { $match: PriceMatchConditions };

      let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
      let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
      let UnwindBrandStage={$unwind:"$brand"}
      let UnwindCategoryStage={$unwind:"$category"}
      let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

      let data= await  ProductModel.aggregate([
          MatchStage,
          AddFieldsStage,
          PriceMatchStage,
          JoinWithBrandStage,JoinWithCategoryStage,
          UnwindBrandStage,UnwindCategoryStage, ProjectionStage
      ])
      return {status:"success",data:data}

  }catch (e) {
      return {status:"fail",data:e}.toString()
  }
}

module.exports = {ProductGet,ProductCategoryList,GetProductBrandList,GetProductByKeyword,GetProductDetails,GetProductSlide,GetProductBycategory,GetProductByBrand,GetProductByRemark,GetProductBySimiler,ListByFilterService}