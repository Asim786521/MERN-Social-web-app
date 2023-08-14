const router = require("express").Router();
const { Long } = require("mongodb");
const Conversation = require("../models/chats");
const {User } = require("../models/user");

//new conv
router.get('/users',async(req,res)=>{
  const user=await User.find()
  try{
      if(user){
    res.json({user})
      }
    
    
  }catch(error){
   console.log(error)
  }
  
     
       
  })
  router.get('/users/:id',async(req,res)=>{
    const user=await User.findOne({_id:req.params._id})
    console.log(user)
    try{
        if(user){
      res.json({data:user})
        }
      
      
    }catch(error){
     console.log(error)
    }
    
       
         
    })

router.post("/", async (req, res) => {
  const newConversation = new Conversation.conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.conversation.find({
      members: { $in: [req.params.userId] },
    });
    
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;