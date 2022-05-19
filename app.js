const express = require("express");
const bodyParser = require("body-parser");
const DBconnect = require("./config/db");
require("dotenv").config({ path: "./config/.env" });

const app = express();

DBconnect();

app.use(express.json());
const authRoutes = require("./routes/authRoute");

app.use("/", authRoutes);

app.listen(process.env.PORT, () => {
	console.log(`Server running in ${process.env.PORT}`);
});
