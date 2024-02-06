const RemarkModel = require('../model/RemarkModel')

async function CreateRemark(req, res) {
    const {remark,remarkid} = req.body
    let remarkModel = new RemarkModel({
        remark,
        remarkid
    })   
    remarkModel.save()
    // await RemarkModel.findOneAndUpdate({_id: remarkModel.remarkid}, {$push:{remarkid:remark._id}}, {new: true})
    res.send({success: "Remark Created Successfull"})
    
}

async function GetRemarkList(req, res) {
    let result = await RemarkModel.find({})
    res.send(result)
}

module.exports = {CreateRemark,GetRemarkList}