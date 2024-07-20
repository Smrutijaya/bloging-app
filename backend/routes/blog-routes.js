import express from 'express';
import { getAllBlogs } from '../controller/blog-controller';
const blogRouter = express.Router();

blogRouter.get("/",getAllBlogs)
export default blogRouter;