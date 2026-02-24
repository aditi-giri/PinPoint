import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import adminRoutes from './routes/admin.routes.js';
import profileRoutes from './routes/profile.routes.js';
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));

app.use(express.json());

//routes
app.use("/api",adminRoutes);
app.use("/api",profileRoutes);
app.use("/api", userRoutes);


app.use(express.static('uploads'));


//database connection
const start = async() => {

    const connectDB = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

    app.listen(8080,()=> {
        console.log("server is running on port 8080");
    })


}

start();
