
import Profile from "../models/profile.model.js";
import Admin from "../models/admin.model.js";

export const createProfile = async (req, res) => {
    try {
        const { name, email, contact, image, description, interests, location } = req.body;

        
        if (!name || !email || !location?.lat || !location?.lng || !location?.address) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        const existingProfile = await Profile.findOne({ email });
        if (existingProfile) {
            return res.status(400).json({ message: "Profile with this email already exists" });
        }

        const profile = new Profile({
            name,
            email,
            contact: contact || "",
            image: image || "default.jpg",
            description: description || "",
            interests: interests || [],
            location,
        });

        await profile.save();
        return res.status(201).json({ message: "Profile created successfully", profile });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        return res.status(200).json(profiles);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export const getProfileById = async (req, res) => {
    try {
        const { profileId } = req.params;
        const profile = await Profile.findById(profileId);

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        return res.status(200).json(profile);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export const editProfile = async (req, res) => {
    try {
        const { profileId } = req.params;
        const { name, email, contact, image, description, interests, location } = req.body;

        // Check if the profile exists
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        // Update fields only if provided
        if (name) profile.name = name;
        if (email) profile.email = email;
        if (contact) profile.contact = contact;
        if (image) profile.image = image;
        if (description) profile.description = description;
        if (interests) profile.interests = interests;
        if (location) profile.location = location;

        await profile.save();
        return res.status(200).json({ message: "Profile updated successfully", profile });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export const deleteProfile = async (req, res) => {
    try {
        const { profileId } = req.params;

        // Check if the profile exists
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        await Profile.findByIdAndDelete(profileId);
        return res.status(200).json({ message: "Profile deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};