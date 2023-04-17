let User = require('../models/userModel');

exports.userAdd = (req,res) => {
    let user = new User(req.body.id, req.body.name, req.body.age, req.body.email);
    console.log(user)
    res.status(200).json({"message":"success"});
}