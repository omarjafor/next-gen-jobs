import mongoose from 'mongoose';

const connectDB = async () => {
    const connectUrl = process.env.DB_URL
    mongoose
        .connect(connectUrl)
        .then(() => console.log('Database Connected Successfully'))
        .catch(e => console.log(e))
};

export default connectDB;