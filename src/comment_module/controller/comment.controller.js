import Comment from "../models/comment.model.js";

export const addOne = async (req, res) => {
  try {
    console.log("created by", req.user.id)
    const newRecord = new Comment({
      content: req.body.content,
      createdBy: req.user.id,
      postId: req.params.id,
    });
    await newRecord.save();
    return res.status(201).json({
      message: "Item successfully created",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const updatedComment = await Comment.findByIdAndUpdate(
      { _id: commentId, postId: id },
      { $set: req.body },
      { new: true, runValidators: true }
    ).exec();
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.status(200).json({
      message: "Comment updated successfully",
      success: true,
      comment: updatedComment,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const getComment = async (req, res) => {
  try {
    const comment = await Comment.find({ postId: req.params.id })
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });
    if (!comment) {
      return res.status(404).json({ message: 'Post or Comment not found' });
    }
    return res.status(200).json({
      message: "Comment found successfully",
      success: true,
      comment,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    return res.status(200).json({
      message: "Comment deleted successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};