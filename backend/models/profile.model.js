import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String },
    image: { type: String, default: "default.jpg" }, 
    description: { type: String },
    interests: { type: [String], default: [] },
    location: {
      lat: { type: Number, required: true },  
      lng: { type: Number, required: true },  
      address: { type: String, required: true } 
    },
  }, { timestamps: true });

  const Profile = mongoose.model("Profile", ProfileSchema);

  export default Profile;