import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in environment variables.');
        }
        await mongoose.connect(mongoURI);
        console.log('MongoDB Conectado...');
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error('Um erro desconhecido ocorreu:', err);
        }
        process.exit(1);
    }
};

export default connectDB;