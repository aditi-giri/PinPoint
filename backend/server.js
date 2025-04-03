import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import adminRoutes from './routes/admin.routes.js';
import profileRoutes from './routes/profile.routes.js';

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


app.use(express.static('uploads'));


//database connection
const start = async() => {

    const connectDB = await mongoose.connect("mongodb+srv://aditigiri_2:sqLEXtKZMR2JhYig@cluster0.dhigz.mongodb.net/PinPoint?retryWrites=true&w=majority&appName=Cluster0")

    app.listen(8080,()=> {
        console.log("server is running on port 8080");
    })


}

start();