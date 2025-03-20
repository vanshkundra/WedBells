const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb+srv://mrkundra:root@cluster0.pixlh.mongodb.net/Wedbells?retryWrites=true&w=majority";

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(MONGO_URL)
        .then(client => {
            console.log('Connected to MongoDB');
            _db = client.db();
            callback(client);
        })
        .catch(err => {
            console.error('Error connecting to MongoDB:', err);
        });
};

const getDb = () => {
    if (!_db) throw new Error('Mongo not Connected');
    return _db;
};

module.exports = { mongoConnect, getDb };
