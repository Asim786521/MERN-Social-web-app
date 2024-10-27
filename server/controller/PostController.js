const postService = require("../services/postServiceHandler");


const getAllPostsController = async (req, res) => {
  try {
    const response = await postService.getAllPosts();
    if (response.error) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};


const getPostByIdController=async(req,res)=>{

  try{
    const response= await postService.getPostById(req.params.id)
    console.log(response);
    
    if(response.error){
      res.status(400).json({error:response.error})
    }else{
      res.status(200).json(response)
    }
  
  }catch(error){
    res.status(500).json(error);
  }

}

const addPostController = async (req, res) => {
  try {
    const response = await postService.uploadPost(req.body, req.file);
    if (response.error) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};

const savePostController = async (req, res) => {
  try {
    const response = await postService.savePost(req.body);
    if (response.error) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};

const likePostController = async (req, res) => {
  try {
    const response = await postService.likePost(req.body);
    if (response.error) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};

const addCommentController = async (req, res) => {
  try {
    const response = await postService.addComment(req.body);
    if (response.error) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};

const deleteCommentController = async (req, res) => {
  try {
    const response = await postService.deleteComment(req.body);
    if (response.error) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};

const searchPostController = async (req, res) => {
  try {
    const response = await postService.searchPost(req.query.postName);
    if (response.error) {
      return res.status(404).send(response.error);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};

const getAllSavedPostsController = async (req, res) => {
  try {
    const response = await postService.getAllSavedPosts();
    if (response.error) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};

const getAllLikedPostsController = async (req, res) => {
  try {
    const response = await postService.getAllLikedPosts();
    if (response.error) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};

module.exports = {
  addPostController,
  savePostController,
  likePostController,
  addCommentController,
  deleteCommentController,
  searchPostController,
  getAllPostsController,
  getAllSavedPostsController,
  getAllLikedPostsController,
  getPostByIdController
};
