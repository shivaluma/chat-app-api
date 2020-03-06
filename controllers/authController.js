const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const keys = 'secret';

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (user)
    return res.status(400).json({ message: 'Username already existed.' });

  const newUser = User({
    username: username,
    password: password
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      newUser.password = hash;
      newUser
        .save()
        .then(user => res.status(200).json({ user: user }))
        .catch(err => res.status(500).json({ message: 'Server error' }));
    });
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user)
    return res.status(404).json({ message: 'Wrong Username or Password.' });
  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch)
    return res.status(401).json({ message: 'Wrong Username or Password.' });

  const payload = { id: user._id, username: user.username };
  jwt.sign(payload, keys, { expiresIn: 36000 }, (err, token) =>
    res.status(200).json({
      user: payload,
      token: token
    })
  );
};
