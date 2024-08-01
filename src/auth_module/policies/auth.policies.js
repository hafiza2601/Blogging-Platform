import User from "./../../user_module/models/user.models.js"
import errors from "../../shared/utils/apiErrors.js";

const register = async (email) => {
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw errors.AlreadyExists("User already exists");
	}
}

const login = async (username) => {
	const foundUser = await User.findOne({ username });
	if (!foundUser) {
		throw errors.NotFound('User not found!')
	}
	return foundUser;
}

export default { register, login };