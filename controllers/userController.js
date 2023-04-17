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

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.updateUser = async (req, res) => {
    
      const user = await User.findByPk(req.params.user_id);
      if (user) {
        await user.update(
          {
            firstname: req.body.firstname,
            lastname: req.body.lastname
          }, {where: {user_id: req.params.user_id}}
        )
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          res.status(500).json({ message: err.message })
        })
      } else {
        res.status(404).send({ message: 'User not found' });
      }
  };

  exports.deleteUser = async (req, res) => {
    const user = await User.findByPk(req.params.user_id);
    if (user) {
      user.destroy(
        { where: {user_id: req.params.user_id} }
      )
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  }
  