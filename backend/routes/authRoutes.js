const express = require("express");
const { signup, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.post("/signup", signup);
router.post("/login", login);

router.get("/test", authMiddleware, (req, res) => {
    res.json({
        message: "Protected route accessed successfully",
        user: req.user
    });
});

module.exports = router;