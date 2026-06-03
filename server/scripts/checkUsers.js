require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("MONGO_URI not set in .env");
  process.exit(1);
}

const userSchema = new mongoose.Schema(
  {},
  { strict: false, collection: "users" },
);
const User = mongoose.model("User_check", userSchema);

mongoose
  .connect(uri, { dbName: "taskflow" })
  .then(async () => {
    console.log("Connected to MongoDB");
    const users = await User.find({}, { email: 1, name: 1 }).limit(50).lean();
    console.log("Users (first 50):");
    users.forEach((u) => console.log(u.email, "-", u.name));
    await mongoose.disconnect();
  })
  .catch((err) => {
    console.error("DB Error:", err.message);
    process.exit(1);
  });
