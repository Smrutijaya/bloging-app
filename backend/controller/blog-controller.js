import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/user.js"; // Ensure the path is correct

// Get all blogs
export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate('user');
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred while fetching blogs" });
  }
  if (!blogs || blogs.length === 0) {
    return res.status(404).json({ message: "No blogs found" });
  }
  return res.status(200).json({ blogs });
};

// Add a new blog
export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred while fetching the user" });
  }

  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user by this ID" });
  }

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });

  try {
    const session= await mongoose.startSession();
    session.startTransaction();
    await blog.save({session});
    existingUser.blogs.push(blog);
    await existingUser.save({session});
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred while saving the blog" });
  }

  return res.status(201).json({ blog });
};

// Update the blog
export const updateBlog = async (req, res, next) => {
  const blogId = req.params.id;
  const { title, description } = req.body;

  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(
      blogId,
      { title, description },
      { new: true } // Return the updated document
    ).populate('user');
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred while updating the blog" });
  }

  if (!blog) {
    return res.status(404).json({ message: "Unable to find the blog" });
  }

  return res.status(200).json({ blog });
};

// Get blog by ID
export const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id).populate('user');
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred while fetching the blog" });
  }
  if (!blog) {
    return res.status(404).json({ message: "Unable to find the blog" });
  }

  return res.status(200).json({ blog });
};

// Delete blog by ID
export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndRemove(blogId).populate('user');
    if (blog) {
      await blog.user.blogs.pull(blog);
      await blog.user.save();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred while deleting the blog" });
  }

  if (!blog) {
    return res.status(404).json({ message: "Unable to find the blog" });
  }

  return res.status(200).json({ message: "Blog deleted successfully" });
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.Id; // Extract user ID from request parameters

  try {
    // Find the user by ID
    const user = await User.findById(userId).populate('blogs'); // Populate the 'blogs' field


  }
  catch(err){
    return console.log(err)
  }

  if(!userBlogs){
    return res.status(400).json({message:"No Blog Found"})
  }
  return res.status(200).json({blog:userBlogs})
}
