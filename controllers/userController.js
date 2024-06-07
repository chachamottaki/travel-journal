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

    // Generate JWT token with user ID as payload
    let payload = { id: user.user_id }; // Use user.user_id to reference the actual user object
    let token = jwt.sign(payload, jwtKey, {
      algorithm: "HS256",
      expiresIn: jwtExpirySeconds,
    });

    // Return the token and its expiry time
    res.json({ token: token, maxAge: jwtExpirySeconds * 1000 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    console.log('Token not provided');
    return res.sendStatus(401);
  }

  jwt.verify(token, jwtKey, (err, user) => {
    if (err) {
      console.log('Token verification failed', err);
      return res.sendStatus(403);
    }
    console.log('Token verified, user:', user);
    req.user = user; // Add user ID to request object
    next();
  });
}

exports.addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.getUser = [
  authenticateToken, // Use middleware to authenticate token
  async (req, res) => {
    try {
      const userId = req.user.id; // Use ID from token
      console.log('Fetching user with ID:', userId);
      const user = await User.findByPk(userId);
      if (user) {
        res.send({ data: `User-specific data for user ID: ${userId}` });
      } else {
        console.log('User not found with ID:', userId);
        res.status(404).send({ message: 'User not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
];

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
