const db = require('../models/index');
const User = db.User;
const jwt = require('jsonwebtoken');
const jwtKey = 'my_secret_key';

exports.login = async function (req, res) {

  const jwtExpirySeconds = 300;
  const { email, password } = req.body;

  try {
    // find user matching email in the DB
    const user = await User.findOne({ where: { email } });
    
    // check if user already in DB or incorrect pwd 
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "username or password incorrect or doesn't exist" });
    }

    let payload = {id: user.iduser};
    let token = jwt.sign(payload, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    })
    // Create authentication token + return it  
    // res.cookie("token", token, { httpOnly: true, secure: true, maxAge: jwtExpirySeconds * 1000 });
    res.json({ "token": token, "maxAge": jwtExpirySeconds * 1000 });
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
          }
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
      user.destroy()
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
  