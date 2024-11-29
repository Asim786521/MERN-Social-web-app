const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	profilePicture: { type: String, default: '' },
	bio: { type: String, default: '' },
	createdAt: { type: Date, default: Date.now },
	userType:{type:String,default:""},
	// followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	// following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({userId: this._id,userType:this.userType }, process.env.JWTPRIVATEKEY, {
		expiresIn: "15m",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("name"),
		 
		email: Joi.string().email().required().label("email"),
		password: passwordComplexity().required().label("password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
