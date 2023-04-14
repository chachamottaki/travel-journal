let User = require('../models/userModel');

exports.userAdd = (req,res) => {
    let user = new User(1,"chacha", "24", "email@gmail.com"); //need to use http request things loke req.body.name ..
    res.status(200).json({"id":user.id,"name":user.name, "age": user.age, "email": user.email});
}