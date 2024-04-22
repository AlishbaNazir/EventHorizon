const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb+srv://usmanamjad:TkiS8cU91tpX4YnS@eventmanagementsystem.9cqe4zu.mongodb.net/';

// Database Name
const dbName = 'event';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
async function connectDb() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        return client.db(dbName);
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        return null;
    }
}

exports.connectionToDB = connectDb;