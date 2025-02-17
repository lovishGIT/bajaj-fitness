import { MongoClient } from 'mongodb';
import env from './validateEnv.config.js';

const uri: string = env.MONGODB_URI;

async function connectDb() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
        return true;
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        throw error;
    }
}

export { connectDb };