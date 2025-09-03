import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection to db is successful");
  } catch (error) {
    console.log(`Failed to connect to db ${error}`);
  }
};
