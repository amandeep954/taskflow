require("dotenv").config();
const mongoose = require("mongoose");

const email = process.argv[2];
const newPass = process.argv[3];
if (!email || !newPass) {
  console.error("Usage: node resetPassword.js <email> <newPassword>");
  process.exit(1);
}

const User = require("../models/User");

mongoose
  .connect(process.env.MONGO_URI, { dbName: "taskflow" })
  .then(async () => {
    console.log("Connected to DB");
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found");
      await mongoose.disconnect();
      process.exit(1);
    }
    await user.setPassword(newPass);
    await user.save();
    console.log("Password updated for", email);
    await mongoose.disconnect();
  })
  .catch((e) => {
    console.error("DB Error:", e.message);
    process.exit(1);
  });
