// server/routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");


// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ email, name });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res
        .status(201)
        .json({ message: "Registered & Logged in!", user: registeredUser });
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// LOGIN
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Welcome back!", user: req.user });
});

// LOGOUT
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Error logging out" });
    res.json({ message: "Logged out successfully" });
  });
});

// UPDATE PROFILE ROUTE
router.put("/profile", async (req, res) => {
  try {
    if (!req.isAuthenticated())
      return res.status(401).json({ message: "Not logged in" });

    const { name, email, password } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;

    // Agar password change karna hai
    if (password) {
      await user.setPassword(password); // Passport-local-mongoose ka method
    }

    await user.save();

    // Session update karein (taaki login bana rahe)
    req.login(user, (err) => {
      if (err)
        return res.status(500).json({ message: "Error updating session" });
      res.json({ message: "Profile updated!", user });
    });
  } catch (e) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

module.exports = router;
