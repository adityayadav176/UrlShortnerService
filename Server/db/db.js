const mongoose = require('mongoose');

const connectToMongo = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB Connected: ${con.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = {
    connectToMongo
};