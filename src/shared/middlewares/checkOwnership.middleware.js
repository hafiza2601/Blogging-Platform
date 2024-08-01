// middlewares/checkOwnership.middleware.js
import Post from './../../post_module/models/post.model.js';
import Comment from './../../comment_module/models/comment.model.js';
import createHttpError from 'http-errors';

export const checkOwnership = (resourceType) => {
  return async (req, res, next) => {
    try {
      const { id: postId, CommentId } = req.params;
      const userId = req.user.id;

      let resource;
      if (resourceType === 'post') {
        resource = await Post.findById(postId);
      } else if (resourceType === 'comment') {
        resource = await Comment.findById(CommentId);
      }

      if (!resource) {
        return next(createHttpError(404, `${resourceType.charAt(0).toUpperCase() + resourceType.slice(1)} not found`));
      }

      if (resource.createdBy.toString() !== userId) {
        return next(createHttpError(403, `You do not have permission to modify this ${resourceType}`));
      }

      next();
    } catch (error) {
      console.error(error);
      next(createHttpError(500, 'Internal Server Error'));
    }
  };
};
