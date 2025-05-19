const mongoose = require("mongoose");
const environment = require("./environment");

const DB = environment.database.uri;

const connection = mongoose.connection;

const connect = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(DB, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });
        }
    } catch (error) {
        console.error('Database connection error:', error);
        // Don't exit the process in serverless environment
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    }
}

connection.on("connected", () => {
    console.log("%s Database Connected", '✔');
    console.log("port: ", environment.port);
    
})
    .on("disconnected", () => {
        console.log("%s Database Disconnected", '✗');
    })
    .on("error", (err) => {
        console.error('Database error:', err);
        // Don't exit the process in serverless environment
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    });

// Only handle SIGINT in non-serverless environment
if (process.env.NODE_ENV !== 'production') {
    process.on("SIGINT", () => {
        connection.close(() => {
            console.log("%s Mongoose default connection is disconnected due to application termination.", '✗');
            process.exit(0);
        });
    });
}

module.exports = { connect }
