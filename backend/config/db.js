const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        // const client = new MongoClient(url, {
        //     serverApi: {
        //       version: ServerApiVersion.v1,
        //       strict: true,
        //       deprecationErrors: true,
        //     }
        //   });
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;