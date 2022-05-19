const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { hashPass, comparePass } = require("../utils/hash");
require("dotenv").config({ path: "../config/.env" });

exports.profile = async (req, res) => {
	try {
		const getUser = await User.findOne({ _id: req.id });
		res.status(200).json({ user: getUser });
	} catch (error) {
		res.status(500).json({ error });
	}
};

exports.login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });

		if (user == null) {
			res
				.status(401)
				.json({ message: `Username ${username} tidak ditemukan!` });
		}

		let statusPass = await comparePass(password, user.password);

		if (user != null) {
			if (statusPass) {
				let access_token = user.token;
				if (access_token !== "") {
					res.json(200, { access_token });
				} else {
					access_token = jwt.sign(
						JSON.stringify(user._id),
						process.env.JWT_SECRET_KEY
					);
					res.json(200, { access_token });
					user.token = access_token;
					user.save();
				}
			} else {
				res.status(401).json({ message: `Password salah` });
			}
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};

exports.logout = async (req, res) => {
	try {
		await User.updateOne({ _id: req.id }, { token: "" });
		res.status(200).json({ message: "logout berhasil" });
	} catch (err) {
		res.status(500).json({ err });
	}
};

exports.register = async (req, res) => {
	console.log("register");
	const { name, username, password } = req.body;
	console.log(`nama : ${name}`);
	console.log(`username : ${username}`);
	console.log(`password : ${password}`);
	try {
		console.log("create data di mongodb");
		const user = await new User({
			name,
			username,
			password,
			// password: await hashPass(password),
		}).save();
		console.log("berhasil create");
		user.token = jwt.sign(JSON.stringify(user._id), process.env.JWT_SECRET_KEY);
		user.save();
		console.log("simpan token");
		res.json({ user });
	} catch (error) {
		console.log("error di controller anjir");
		res.status(500).json({ error });
	}
};
