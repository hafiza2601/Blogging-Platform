import Post from "../models/post.model.js";
import createHttpError from "http-errors";

const create = async (title) => {
	const duplicate = await Post.findOne({ title }).lean().exec();
	if (duplicate) {
		throw createHttpError(409, {
			statusCode: 'DUPLICATE_POST_TITLE',
			message: "Duplicate post title"
		});
	}
}

export default { create }