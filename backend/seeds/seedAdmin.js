import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Admin from "../models/admin.model.js";
import path from "path";

dotenv.config({ path: path.resolve("../.env") }); 



// MongoDB connection string
const mongoURI = process.env.MONGO_URI;

// Seeding function
const seedAdminRecords = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected");

        const records = [
            {
                name: "Admin",
                email: "aditigiri002@gmail.com",
                password: await bcrypt.hash("Admin@123", 10),
                role: "admin"
            }
        ];
          
        await Admin.insertMany(records);
        console.log("Admin records seeded successfully");

        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding admin records:", error.message);
        mongoose.connection.close();
    }
};

seedAdminRecords();
