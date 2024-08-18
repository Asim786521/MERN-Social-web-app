const postModel = require("../models/posts.js");
const { User } = require("../models/user");
const multer = require("multer");

const { ObjectId } = require("mongodb");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const gellAll = async (req, res) => await res.json("post home");

const AddPost = async (req, res) => {
  try {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: "File upload failed" });
      }
      const finduser = await User.findOne({ _id: req.body._id });

      if (!finduser) {
        return res.status(404).json({ error: "User not found" });
      }
      const dates = new Date();
      const uploadedTime = dates.toDateString();
      const saveFile = await postModel.postData.create({
        createdAt: uploadedTime,
        userId: finduser._id,
        userName: finduser.username,
        name: req.body.title,
        image: req.file.filename,
      });
      console.log(saveFile);
      return res.status(200).json({ status: "uploaded", file: req.file });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};
const getPostData = async (req, res) => {
  await postModel.postData.find().then((user) => res.json(user));

};
const SavedPost = async (req, res) => {
  const savePostobject = req.body.savedPostdata;

  const savedataCheck = await postModel.savedPost.findOne({
    postId: new ObjectId(savePostobject.userId),
    title: savePostobject.title,
    Image: savePostobject.Image,
  });

  if (savedataCheck) {
    return res.json({
      status: "error",
      message: "post already saved",
      _id: savedataCheck.postId,
    });
  } else {
    await postModel.savedPost.create({
      postId: new ObjectId(savePostobject.userId),
      title: savePostobject.title,
      Image: savePostobject.Image,
    });
    return res.json({ status: "success", response: "post saved" });
  }
};

const getAllSavedpost = (req, res) => {
  postModel.savedPost
    .find()
    .then((saved) => res.json(saved))
    .catch((err) => console.log(err));
};

const LikedPost = async (req, res) => {
  const likedPostobject = req.body.likedPostdata;

  const likeddataCheck = await postModel.likedPost.findOne({
    likedpostId: new ObjectId(likedPostobject.userId),
    title: likedPostobject.title,
    Image: likedPostobject.Image,
    likedStatus: likedPostobject.liked,
  });

  if (likeddataCheck) {
    return res.json({
      status: "error",
      message: "post already liked",
      _id: likeddataCheck.likedpostId,
    });
  } else {
    await postModel.likedPost.create({
      likedpostId: new ObjectId(likedPostobject.userId),
      title: likedPostobject.title,
      Image: likedPostobject.Image,
      likedStatus: likedPostobject.liked,
    });
    return res.json({ status: "success", response: " post liked" });
  }
};

const getAllLikedPost = async (req, res) => {
  postModel.likedPost
    .find()
    .then((liked) => res.json(liked))
    .catch((err) => console.log(err));
};
const findLikedPostwithId = async (req, res) => {
  try {
    const post = await postModel.postData.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateComment = async (req, res) => {
  const post = await postModel.postData.findOne({
    _id: req.body.commentData.postId,
  });
  if (post) {
    console.log("post found");
    await post.updateOne({
      $push: {
        comments: {
          commentedpostId: req.body.commentData.postId,
          commentedUserId: req.body.commentData.commentedUserId,
          commentedUserName: req.body.commentData.userName,
          comment: req.body.commentData.comment,
        },
      },
    });
    return res.status(200).json({
      message: `${req.body.commentData.userName} is added a new comment`,
      comment: req.body.commentData.comment,
      _id: post._id,
    });
  }
};

const deleteComment = async (req, res) => {
  const post = await postModel.postData.findOne({
    _id: req.body.Deletecomment.commentedpostId,
  });

  try {
    if (post) {
      await post
        .updateOne({
          $pull: {
            comments: {
              commentedUserId: req.body.Deletecomment.commentedUserId,
              comment: req.body.Deletecomment.comment,
            },
          },
        })
        .then((res) => {
          console.log("comment deleted", res);
        });
      return res.json({
        status: "error",
        message: `${req.body.Deletecomment.comment}  comment deleted`,
        _id: req.body.Deletecomment.commentedUserId,
        commentIndex: req.body.Deletecomment.commentedIndex,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const PostSearch = async (req, res) => {
  const postName = req.query.postName;

  try {
    const findPost = await postModel.postData.findOne({
      name: new RegExp(postName, "i"),
    });

    if (findPost) {
      return res.status(200).json({ post: findPost });
    } else {
      return res.status(404).send("message not found");
    }
  } catch (errr) {
    return res.status(500).json({ errr: errr });
  }
};

module.exports = {
  gellAll,
  AddPost,
  getPostData,
  SavedPost,
  getAllSavedpost,
  LikedPost,
  getAllLikedPost,
  findLikedPostwithId,
  updateComment,
  deleteComment,
  PostSearch,
};
