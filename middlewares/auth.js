const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config({ path: "../config/.env" });

function authenticateToken(authHeader) {
	return new Promise(async (res, rej) => {
		const token = authHeader && authHeader.split(" ")[1];
		try {
			const getUser = await User.findOne({ token });
			token == null || getUser == null ? res(401) : res(getUser);
		} catch (err) {
			rej(err);
		}
	});
}

exports.protect = async (req, res, next) => {
	const user = await authenticateToken(req.headers["authorization"]);
	if (user == 401) res.sendStatus(user);
	jwt.verify(user.token, process.env.JWT_SECRET_KEY, (err, id) => {
		if (err) res.sendStatus(403);
		req.id = JSON.parse(id);
	});
	next();
};

exports.authorize = (roles) => {
	return async (req, res, next) => {
		const user = await authenticateToken(req.headers["authorization"]);
		if (roles !== user.role) {
			res
				.status(403)
				.json(`Pengguna dengan role ${user.role} tidak mendapatkan akses`);
		}
		next();
	};
};
