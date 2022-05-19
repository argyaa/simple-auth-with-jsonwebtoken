const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.hashPass = async (pass) => {
	return await new Promise((res, rej) => {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(pass, salt, (err, hash) => {
				if (err) rej(err);
				res(hash);
			});
		});
	});
};

exports.comparePass = async (pass, hash) => {
	return await new Promise((res, rej) => {
		bcrypt.compare(pass, hash, (err, result) => {
			if (err) rej(err);
			res(result);
		});
	});
};

exports.hashName = (fileName) => {
	return crypto.createHash("md5").update(fileName).digest("hex");
};
