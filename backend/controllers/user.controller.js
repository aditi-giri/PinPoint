import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).populate("profiles");
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: "user" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserProfiles = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("profiles");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.profiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const assignProfileToUser = async (req, res) => {
    try {
        const { userId, profileId } = req.body;

        // 1️⃣ Check if property already assigned to ANY user
        const alreadyAssigned = await User.findOne({
            profiles: profileId,
        });

        if (alreadyAssigned) {
            return res.status(400).json({
                message: "This property is already assigned to another user",
            });
        }

        // 2️⃣ Assign to requested user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.profiles.push(profileId);
        await user.save();

        res.status(200).json({
            message: "Property assigned successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// controllers/user.controller.js
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate("profiles");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const removePropertyFromUser = async (req, res) => {
    try {
        const { userId, profileId } = req.body;

        if (!userId || !profileId) {
            return res.status(400).json({ message: "Invalid request" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.profiles = user.profiles.filter(
            (id) => id.toString() !== profileId
        );

        await user.save();

        return res.status(200).json({
            message: "Property removed successfully",
            user,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
