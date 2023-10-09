// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    // 아이디 중복 체크
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      console.log(`Registration attempt failed. Username: ${req.body.username} already exists.`);
      return res.status(400).json({ error: 'Username already exists' });
    }

     // 비밀번호 해싱
     const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

     console.log(`New registration. Username: ${req.body.username}, Password: ${req.body.password}`); // 비밀번호 로깅은 위험할 수 있습니다.

    // req.body에서 사용자 정보를 추출하여 MongoDB에 저장
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    await user.save();

    console.log(`User ${req.body.username} successfully saved to the database.`); // 유저가 DB에 성공적으로 저장되었음을 로그로 출력

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(`Error during registration for username: ${req.body.username}. Error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.login = async (req, res) => {
  try {
    // 사용자 이름으로 사용자 찾기
    const user = await User.findOne({ username: req.body.username });
    
    if (!user) {
      console.log(`Login attempt failed for username: ${req.body.username}. User not found.`);
      return res.status(401).json({ error: 'Authentication failed. User not found.' });
    }

    // 해싱된 비밀번호 검증
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      console.log(`Login attempt failed for username: ${req.body.username}. Incorrect password.`);
      return res.status(401).json({ error: 'Authentication failed. Wrong password.' });
    }

    console.log(`User ${req.body.username} logged in successfully.`);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // 1시간 동안 유효

    res.status(200).json({ message: 'Logged in successfully', token: token });

  } catch (err) {
    console.error(`Error during login for username: ${req.body.username}. Error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};
