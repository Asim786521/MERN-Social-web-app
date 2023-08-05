const express=require('express')
const route=express.Router()
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const multer = require('multer')
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, 'public/User')
	},
	filename: (req, file, cb) => {
	  cb(null, file.originalname)
	},
  })
  
  const upload = multer({ storage: storage })
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

route.post('/add-profileImage',upload.single('file'),async(req,res)=>{
	const user=await User.findOne({_id:req.body.userId})

	console.log(`profile updated ${req.file.filename}`);
	try{
		if(user){
	const profileFile=user.profileImage.push(req.file.filename) 
	await profileFile.save()
	console.log("profile to db",profileFile)
		return res.status(200).json({ status: 'profile updated', });
	
	}
	}catch(error){
		console.log(error);
	}
	
})
module.exports = route;
