import mongoose from "mongoose";

export const connectMongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error Connecting To MongoDB ", error);
    }
};




//TE1u0CF0odgdjeUg
//ukhyam12
//115.134.66.80
