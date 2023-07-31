const express=require('express')
const route=express.Router()
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

route.post("/", async (req, res) => {
 
	try {
 

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
		console.log("added to the database")
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = route;
