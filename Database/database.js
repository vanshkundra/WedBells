const mongo = require('mongodb');  
const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb+srv://mrkundra:root@cluster0.pixlh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(MONGO_URL, {
        tls: true,  
        tlsAllowInvalidCertificates: false, 
    })
    .then(client => {
        console.log('Connected to MongoDB');
        _db = client.db('Wedbells'); // Store the database instance
        callback(client); // Pass the client for further usage
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
};

const getDb = () => {
    if (!_db) {
        throw new Error('Mongo not Connected');
    }
    return _db;
};

module.exports = { mongoConnect, getDb }; // Correct way to export multiple functions
