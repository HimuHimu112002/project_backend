const CartModel = require("../model/CartModel");
const ProductModel = require("../model/ProductModel");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;

async function CartServices(req, res) {
  try {

    let user_id = new ObjectID(req.headers.user_id);
    let matchStage = { $match: { userID: user_id } };

    let JoinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let unwindProductStage = { $unwind: "$product" };

    let JoinStageBrand = {
      $lookup: {
        from: "brands",
        localField: "product.brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };

    let JoinStageCategory = {
      $lookup: {
        from: "categories",
        localField: "product.categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let unwindCategoryStage = { $unwind: "$category" };

    let projectionStage = {
      $project: {
        _id: 1,
        userID: 0,
        createAt: 0,
        updatedAt: 0,
        "product._id": 0,
        "product.categoryID": 0,
        "product.brandID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    let data = await CartModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindProductStage,
     JoinStageBrand,
     unwindBrandStage,
      JoinStageCategory,
      unwindCategoryStage,
      projectionStage,
    ]);

    res.send({ status: "success", data: data });
  } catch (e) {
    res.send({ status: "fail", message: "Something Went Wrong !" });
  }

}

async function UpdateCartList(req, res) {
  try {
    let user_id = req.headers.user_id;
    let cartID = req.params.cartID;
    let reqBody = req.body;
    await CartModel.updateOne(
      { _id: cartID, userID: user_id },
      { $set: reqBody }
    );
    res.send({ status: "success", message: "Cart List Update Success" });
  } catch (e) {
    res.send({ status: "fail", message: "Something Went Wrong !" });
  }
}

async function SaveCart(req, res) {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await CartModel.create(reqBody);
    res.send({ status: "success", message: "Cart List Save Success" });
  } catch (e) {
    res.send({ status: "fail", message: "Something Went Wrong !" });
  }
}

async function RemoveCart(req, res) {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    console.log(reqBody)
    reqBody.userID = user_id;
    await CartModel.deleteOne(reqBody);
    res.send({ status: "success", message: "Cart List Remove Success" });
  } catch (e) {
    res.send({ status: "fail", message: "Something Went Wrong !" });
  }
}

module.exports = { CartServices, UpdateCartList, SaveCart, RemoveCart };
