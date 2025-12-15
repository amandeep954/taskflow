module.exports.isLoggedIn = (req, res, next) => {
    // Passport ka method: check karta hai user session me hai ya nahi
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "You must be logged in first!" });
    }
    next();
};