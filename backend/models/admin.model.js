import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin"], default: "admin" },
    token: { type: String , default: "" }
}, { timestamps: true });

AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;