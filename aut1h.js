const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../core/security');

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.json({ error: 'Email already exists' });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashed });

  res.json({ message: 'User created', userId: user._id });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ error: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ error: 'Wrong password' });

  const token = generateToken(user);

  res.json({ message: 'Login success', token });
});

module.exports = router;
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.error) {
    alert(data.error);
  } else {
    // حفظ التوكن
    localStorage.setItem("token", data.token);

    // تحويل المستخدم للصفحة الرئيسية
    window.location.href = "home.html";
  }
}