const { MongoClient } = require("mongodb")
require("dotenv").config({path: "./config.env"})

const client = new MongoClient(process.env.ATLAS_URI);
let db;

async function connectDB() {
    try {
        await client.connect()
        db = client.db("StreetFix")
        console.log("DB connection success")
    } catch (error) {
        console.log("DB connection not success")
    }
}

function getDB(){
    return db;
}

module.exports = { connectDB , getDB }
