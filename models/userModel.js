const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
	token: {
		type: String,
		default: "",
	},
});

module.exports = mongoose.model("user", schema);
