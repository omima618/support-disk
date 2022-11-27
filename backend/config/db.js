const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(
            `MongoDB connected : ${conn.connection.host}`.cyan.underline
        );
    } catch (error) {
        console.log(`Error :  ${error.message}`.red.underline.bold);
    }
};

module.exports = connectDB;
