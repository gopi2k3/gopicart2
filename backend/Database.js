import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path, { dirname } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();  // Load environment variables

dotenv.config();  // Load environment variables



 // Log the URI to check if it's correct

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);  // Directly use the hardcoded URI here
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
