const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');

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


// {
//   "_id": {
//     "$oid": "66c57924eab139f8ffd660e2"
//   },
//   "step": 0,
//   "customer": "C1093826151",
//   "age": 4,
//   "gender": "M",
//   "zipcodeOri": "28007",
//   "merchant": "M348934600",
//   "zipMerchant": "28007",
//   "category": "es_transportation",
//   "amount": 4.55,
//   "fraud": 0
// }

// statistic data
const collectionName2 = 'categoryStatistics';
async function calculateAndInsertCategoryStatistics() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName2);
        const statistics = await db.collection(collectionName).aggregate([
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$amount" },
                    totalTransactions: { $sum: 1 },
                    averageAmount: { $avg: "$amount" },
                    totalFraud: { $sum: { $cond: { if: { $eq: ["$fraud", 1] }, then: 1, else: 0 } } },
                    totalNonFraud: { $sum: { $cond: { if: { $eq: ["$fraud", 0] }, then: 1, else: 0 } } }
                }
            }
        ]).toArray();
        await collection.insertMany(statistics);
        console.log('Statistics inserted successfully!');
    } finally {
        await client.close();
    }
}




const collectionName3 = 'merchantStatistics';
async function calculateAndInsertMerchantStatistics() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName3);
        const statistics = await db.collection(collectionName).aggregate([
            {
                $group: {
                    _id: "$merchant",
                    totalAmount: { $sum: "$amount" },
                    totalTransactions: { $sum: 1 },
                    averageAmount: { $avg: "$amount" },
                    totalFraud: { $sum: { $cond: { if: { $eq: ["$fraud", 1] }, then: 1, else: 0 } } },
                    totalNonFraud: { $sum: { $cond: { if: { $eq: ["$fraud", 0] }, then: 1, else: 0 } } }
                }
            }
        ]).toArray();
        await collection.insertMany(statistics);
        console.log('Merchant Statistics inserted successfully!');
    } finally {
        await client.close();
    }
}




const collectionName4 = 'ageStatistics';
async function calculateAndInsertAgeStatistics() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName4);
        const statistics = await db.collection(collectionName).aggregate([
            {
                $group: {
                    _id: "$age",
                    totalAmount: { $sum: "$amount" },
                    totalTransactions: { $sum: 1 },
                    averageAmount: { $avg: "$amount" },
                    totalFraud: { $sum: { $cond: { if: { $eq: ["$fraud", 1] }, then: 1, else: 0 } } },
                    totalNonFraud: { $sum: { $cond: { if: { $eq: ["$fraud", 0] }, then: 1, else: 0 } } }
                }
            }
        ]).toArray();
        await collection.insertMany(statistics);
        console.log('Age Statistics inserted successfully!');
    } finally {
        await client.close();
    }
}



const collectionName5 = 'genderStatistics';
async function calculateAndInsertGenderStatistics() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName5);
        const statistics = await db.collection(collectionName).aggregate([
            {
                $group: {
                    _id: "$gender",
                    totalAmount: { $sum: "$amount" },
                    totalTransactions: { $sum: 1 },
                    averageAmount: { $avg: "$amount" },
                    totalFraud: { $sum: { $cond: { if: { $eq: ["$fraud", 1] }, then: 1, else: 0 } } },
                    totalNonFraud: { $sum: { $cond: { if: { $eq: ["$fraud", 0] }, then: 1, else: 0 } } }
                }
            }
        ]).toArray();
        await collection.insertMany(statistics);
        console.log("Gender Statistics inserted successfully!");
    } finally {
        await client.close();
    }
}


const collectionName6 = 'amountStatistics';
async function calculateAndInsertAmountStatistics() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName6);

        // Define your range boundaries
        const rangeBoundaries = [
            0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, // add more as needed
        ];

        // Aggregate statistics
        const statistics = await db.collection(collectionName).aggregate([
            {
                $bucket: {
                    groupBy: "$amount",
                    boundaries: rangeBoundaries,
                    default: "Other", // For amounts outside the defined ranges
                    output: {
                        totalAmount: { $sum: "$amount" },
                        totalTransactions: { $sum: 1 },
                        averageAmount: { $avg: "$amount" },
                        totalFraud: { $sum: { $cond: { if: { $eq: ["$fraud", 1] }, then: 1, else: 0 } } },
                        totalNonFraud: { $sum: { $cond: { if: { $eq: ["$fraud", 0] }, then: 1, else: 0 } } },
                        minAmount: { $min: "$amount" },
                        maxAmount: { $max: "$amount" }
                    }
                }
            }
        ]).toArray();

        // Add random ID and range information
        const statisticsWithRanges = statistics.map(stat => ({
            _id: uuidv4(), // Generate a random ID
            totalAmount: stat.totalAmount,
            totalTransactions: stat.totalTransactions,
            averageAmount: stat.averageAmount,
            totalFraud: stat.totalFraud,
            totalNonFraud: stat.totalNonFraud,
            amountRange: {
                start: stat._id,
                end: stat._id + 100 // Adjust based on your ranges
            }
        }));

        // Insert statistics with new fields into the collection
        await collection.insertMany(statisticsWithRanges);
        console.log("Amount Statistics inserted successfully!");
    } finally {
        await client.close();
    }
}



const collectionName7 = 'fraudStatistics';
async function calculateAndInsertFraudStatistics() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName7);
        const statistics = await db.collection(collectionName).aggregate([
            {
                $group: {
                    _id: "$fraud",
                    totalAmount: { $sum: "$amount" },
                    totalTransactions: { $sum: 1 },
                    averageAmount: { $avg: "$amount" },
                    totalFraud: { $sum: { $cond: { if: { $eq: ["$fraud", 1] }, then: 1, else: 0 } } },
                    totalNonFraud: { $sum: { $cond: { if: { $eq: ["$fraud", 0] }, then: 1, else: 0 } } }
                }
            }
        ]).toArray();
        await collection.insertMany(statistics);
        console.log("Fraud Statistics inserted successfully!");
    } finally {
        await client.close();
    }
}



const filePath = 'HSBC.csv';
readCSVAndInsert(filePath);
calculateAndInsertCategoryStatistics();
calculateAndInsertMerchantStatistics();
calculateAndInsertAgeStatistics();
calculateAndInsertGenderStatistics();
calculateAndInsertAmountStatistics();
calculateAndInsertFraudStatistics();