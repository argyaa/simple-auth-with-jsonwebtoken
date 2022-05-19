const express = require("express");
const router = express.Router();

const {
	login,
	logout,
	profile,
	register,
	user
} = require("../controllers/authController");

const { protect } = require("../middlewares/auth");

router.get("/user", user)
router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, profile);
router.patch("/logout", protect, logout);

module.exports = router;
