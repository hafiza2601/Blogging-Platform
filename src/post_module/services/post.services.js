import Post from "../models/post.model.js";

const create = async (title, content, userId) => {
	const newPost = new Post({
		title,
		content,
		createdBy: userId,
	});

	//Save new post
	await newPost.save();
	return newPost;
}

export default { create }
