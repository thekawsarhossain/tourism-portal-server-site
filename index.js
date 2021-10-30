const { MongoClient } = require("mongodb");
const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// using middlewere here 
app.use(cors());
app.use(express.json());

// database uri and client here 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s74ce.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// connecting with database here 
async function run() {

    try {
        await client.connect();
        const database = client.db('tourism-network');
        const dataCollection = database.collection('packages');

        // get api here 
        app.get('/packages', async (req, res) => {
            const cursor = dataCollection.find({});
            const result = await cursor.toArray();
            res.json(result);
        });

        // get single data here 
        app.get('/package/:id', async (req, res) => {
            const query = { _id: ObjectId(req.params.id) }
            const package = await dataCollection.findOne(query);
            res.json(package);
        })

    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir)


// port listening here 
app.listen(port, () => {
    console.log('Listening the port', port);
});