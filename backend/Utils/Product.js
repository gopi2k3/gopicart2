import products from '../Data/Product.json' assert { type: "json" };

import { connectDb} from "../Database.js";
import { ProductModels } from "../Models/productModel.js";
import dotenv from 'dotenv';

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDb(); // Ensure database is connected

    await ProductModels.deleteMany();
    console.log("Products Deleted");

    await ProductModels.insertMany(products);
    console.log("Products Inserted");
  } catch (err) {
    console.error("Error seeding products:", err);
  } finally {
    // await closeDb(); // Ensure database connection is closed
    process.exit(); // Exit process
  }
};

seedProducts();
