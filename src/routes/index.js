import { addRoutes as postRoutes } from "../post_module/routes.js";
import { addRoutes as authRoutes } from "../auth_module/routes.js";
import { addRoutes as commentRoutes } from "../comment_module/routes.js";

export default [
    authRoutes,
    postRoutes,
    commentRoutes,
]