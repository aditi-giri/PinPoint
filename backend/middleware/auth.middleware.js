import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" }); 

import jwt from "jsonwebtoken";



export const verifyAdmin = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; 

    try {
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        req.admin = verified; 
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
