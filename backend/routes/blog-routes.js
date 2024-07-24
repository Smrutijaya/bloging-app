
import express from 'express';
import { addBlog, deleteBlog, getAllBlogs, getById, getByUserId, updateBlog } from '../controller/blog-controller.js'; // Ensure the correct extension is used

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.put("/update",updateBlog);
blogRouter.get("/:id",getById);
blogRouter.delete("/:id",deleteBlog);
blogRouter.get("/user/:id",getByUserId)
export default blogRouter;
