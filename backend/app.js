import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';

const app = express();

app.use(express.json()); // To parse JSON request bodies
app.use("/api/users", router); // Use the user routes
// app.use("/api/blog",blogRouter);


mongoose.connect("mongodb+srv://smrutijayaroutray:j5nnyKUe6q7rDWFn@cluster0.suzti5f.mongodb.net/")
.then(() => {
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
        console.log("Connected to the database");
    });
})
.catch(err => {
    console.log(err);
});

