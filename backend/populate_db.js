const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');

// MongoDB connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'hsbc';
const collectionName = 'transactions';

// Function to insert data into MongoDB
async function insertData(data, batchSize = 500) {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Split the data into batches
        for (let i = 0; i < data.length; i += batchSize) {
            const batch = data.slice(i, i + batchSize);
            try {
                await collection.insertMany(batch);
                console.log(`Inserted ${batch.length} documents.`);
            } catch (error) {
                // Handle specific error codes
                if (error.code === 11000) {
                    // Duplicate key error, skip this batch
                    console.log(`Skipping batch with duplicate keys.`);
                } else {
                    // Handle other errors
                    console.error('Error inserting data:', error);
                    throw error;
                }
            }
        }
        console.log('Data inserted successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
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
async function readCSVAndInsert(filePath) {
    const results = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => results.push(parseData(row)))
            .on('end', async () => {
                try {
                    await insertData(results);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            })
            .on('error', (error) => reject(error));
    });
}


async function calculateAndInsertStatistics(collectionCurr, groupByField) {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionCurr);
        const statistics = await db.collection(collectionName).aggregate([
            {
                $group: {
                    _id: `$${groupByField}`,
                    totalAmount: { $sum: "$amount" },
                    totalTransactions: { $sum: 1 },
                    averageAmount: { $avg: "$amount" },
                    totalFraud: { $sum: { $cond: { if: { $eq: ["$fraud", 1] }, then: 1, else: 0 } } },
                    totalNonFraud: { $sum: { $cond: { if: { $eq: ["$fraud", 0] }, then: 1, else: 0 } } }
                }
            }
        ]).toArray();

        if (statistics.length > 0) {
            await collection.insertMany(statistics);
            console.log(`${groupByField} Statistics inserted successfully!`);
        } else {
            console.log(`No ${groupByField} statistics to insert.`);
        }
    } catch (error) {
        console.error(`Error calculating ${groupByField} statistics:`, error);
    } finally {
        await client.close();
    }
}

// Function to calculate and insert amount statistics with ranges
async function calculateAndInsertAmountStatistics() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('amountstatistics');

        // Define your range boundaries
        const rangeBoundaries = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, Infinity];

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

        // Insert statistics with new fields into the collection
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

        await collection.insertMany(statisticsWithRanges);
        console.log("Amount Statistics inserted successfully!");
    } catch (error) {
        console.error('Error calculating amount statistics:', error);
    } finally {
        await client.close();
    }
}

async function main() {
    const filePath = 'HSBC.csv';
    try {
        await readCSVAndInsert(filePath);
        await calculateAndInsertAmountStatistics();
        await calculateAndInsertStatistics('categorystatistics', 'category');
        await calculateAndInsertStatistics('merchantstatistics', 'merchant');
        await calculateAndInsertStatistics('agestatistics', 'age');
        await calculateAndInsertStatistics('genderstatistics', 'gender');
        await calculateAndInsertStatistics('fraudstatistics', 'fraud');
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

main();
