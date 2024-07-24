import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,                  // user field is designed to create a relationship between a blog post and a user.
        ref: "User",
        required: true,                                 
    }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
