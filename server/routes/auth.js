const route= require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
 

route.post("/", async (req, res) => {
  
	try {
        const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });


		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
     
        return res.status(401).send({ message: "Invalid Email or Password" });
    const token = user.generateAuthToken()
	  
	 return res.status(200).send({ data: token, _id:user._id,name:user.username, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


route.get("/getUser-Profile/:id",async (req,res)=>{
	const user = await User.findById(req.params.id);
	if(user){
 
		res.status(200).send({ status: 'profile updated',name:user.username,profileImage:user.profileImage });	
	}
})

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("email"),
		password: Joi.string().required().label("password"),
	});
	return schema.validate(data);
};

module.exports = route;