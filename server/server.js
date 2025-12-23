require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo").default || require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");

const app = express();

// --- 1. RENDER PROXY SETUP (Jaruri hai) ---
app.set("trust proxy", 1);

// --- DB CONNECTION ---
const dbUrl = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/taskflow_db";
mongoose
  .connect(dbUrl)
  .then(() => console.log("✅ Database Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// --- 2. MIDDLEWARE (CORS FIXED) ---
// Ab ye Localhost aur Live Site dono ko accept karega
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local Testing ke liye
      "https://taskflow-client-0400.onrender.com", // 👈 YAHAN APNI FRONTEND LINK DALEIN
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- SESSION CONFIG ---
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: { secret: process.env.SECRET || "secretcode" },
  touchAfter: 24 * 3600,
});

app.use(
  session({
    store,
    secret: process.env.SECRET || "secretcode",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // Render par secure true hona chahiye (HTTPS ke liye)
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
    },
  })
);

// --- PASSPORT INIT ---
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: "email" }, User.authenticate())
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --- ROUTES ---
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
