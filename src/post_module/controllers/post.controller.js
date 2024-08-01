import Post from "../models/post.model.js";
import Comment from "../../comment_module/models/comment.model.js";
import errors from "../../shared/utils/apiErrors.js";
import postPolicies from "../policies/post.policies.js";
import postServices from "../services/post.services.js";
import ErrorHandler from "../../shared/middlewares/errorHandler.js"

//Create new post
const createPost = async (req, res) => {
  const userId = req.user.id;
  try {
    const { title, content } = req.body;

    // Check for duplicate title
    await postPolicies.create(title);

    // Create a new post
    const newPost = await postServices.create(title, content, userId);

    return res.status(200).json({
      data: newPost,
      message: "Post is successfully created",
      success: true,
    });
  } catch (error) {
    ErrorHandler(error, req, res);
  }
};

// Post details
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('createdBy', 'username');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Fetch comments associated with the post
    const comments = await Comment.find({ post: req.params.id }).populate('createdBy', 'username');

    res.status(200).json({ post, comments });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const updatePost = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const { title, content } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return next(errors.NotFound('Post not found'));
    }

    post.title = title || post.title;
    post.content = content || post.content;
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id: postId } = req.params;

    // Delete the post by its ID
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete all comments associated with the post
    await Comment.deleteMany({ postId });

    res.status(200).json({ message: 'Post and associated comments deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const listPosts = async (req, res) => {
  try {
    const { page = 1, limit = 1, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const posts = await Post.find()
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      posts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {
  createPost,
  getPost,
  updatePost,
  deletePost,
  listPosts
};