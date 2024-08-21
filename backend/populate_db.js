const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const csv = require('csv-parser');

// MongoDB connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'hsbc';
const collectionName = 'transactions';

// Function to insert data into MongoDB
async function insertData(data) {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        await collection.insertMany(data);
        console.log('Data inserted successfully!');
    } finally {
        await client.close();
    }
}

// Function to parse and convert data types
function parseData(row) {
    return {
        step: parseInt(row.step.replace(/'/g, ''), 10),
        customer: row.customer.replace(/'/g, ''),
        age: parseInt(row.age.replace(/'/g, ''), 10),
        gender: row.gender.replace(/'/g, ''),
        zipcodeOri: row.zipcodeOri.replace(/'/g, ''),
        merchant: row.merchant.replace(/'/g, ''),
        zipMerchant: row.zipMerchant.replace(/'/g, ''),
        category: row.category.replace(/'/g, ''),
        amount: parseFloat(row.amount.replace(/'/g, '')),
        fraud: parseInt(row.fraud.replace(/'/g, ''), 10)
    };
}

// Function to read data from CSV and insert into MongoDB
function readCSVAndInsert(filePath) {
    const results = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => results.push(parseData(row)))
        .on('end', () => {
            insertData(results);
        });
}

const filePath = 'HSBC.csv';
readCSVAndInsert(filePath);

