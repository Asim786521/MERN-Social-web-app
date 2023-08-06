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
	const user=await User.findOne({_id:req.body._id})

 
	 try{
		if(user){

			await user.updateOne({ $set: { profileImage:req.file.filename }})
			  res.status(200).send({ status: 'profile updated',name:user.username,profileImage:user.profileImage });	
	 
	 

		 console.log("updated value is",await User.findOne({_id:req.body._id}));
		// Load the document to see the updated value
 
	} 
	}catch(error){
		console.log(error);
	}
	
})
module.exports = route;
