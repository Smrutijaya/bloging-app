import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: "Blog",
        required: true
    }]
});

const User = mongoose.model('User', UserSchema);

export default User;
