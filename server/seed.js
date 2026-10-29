import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { products } from '../src/data/products.js';
import { ingredients } from '../src/data/ingredients.js';
import { collections } from '../src/data/collections.js';
import { journalArticles } from '../src/data/journal.js';

import { Product } from './models/Product.js';
import { Ingredient } from './models/Ingredient.js';
import { Collection } from './models/Collection.js';
import { Journal } from './models/Journal.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root regardless of working directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

export async function seedDatabase() {
  try {
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI is missing in your .env file.');
      return;
    }

    if (MONGODB_URI.includes('<password>') || MONGODB_URI.includes('<username>') || MONGODB_URI.includes('cluster0.mongodb.net')) {
      console.error('\n❌ Invalid MongoDB Connection String in .env file!');
      console.error('👉 You still have placeholder text (<password> or cluster0.mongodb.net) in your .env file.');
      console.error('👉 Please paste your real MongoDB Atlas connection string into .env\n');
      return;
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
      console.log('🌱 Connected to MongoDB Atlas for seeding...');
    }

    // Seed Products
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('✅ Products seeded successfully');

    // Seed Ingredients
    await Ingredient.deleteMany({});
    await Ingredient.insertMany(ingredients);
    console.log('✅ Ingredients seeded successfully');

    // Seed Collections
    await Collection.deleteMany({});
    await Collection.insertMany(collections);
    console.log('✅ Collections seeded successfully');

    // Seed Journal
    await Journal.deleteMany({});
    await Journal.insertMany(journalArticles);
    console.log('✅ Journal Articles seeded successfully');

    console.log('🚀 Database seeding complete!');
  } catch (err) {
    console.error('❌ Database seeding failed:', err.message);
  }
}

if (process.argv[1]?.endsWith('seed.js')) {
  seedDatabase().then(() => mongoose.disconnect());
}
