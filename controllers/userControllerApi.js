const User = require('../models/userModel');

exports.addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

