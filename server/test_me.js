// import {MongoClient} from "mongodb";
// // Connection URI
// // Replace the following with your MongoDB Atlas connection URI
// const uri = 'mongodb+srv://manikanta:mani123@cluster0.1w2nxxf.mongodb.net/blendnet_database>?retryWrites=true&w=majority';

// // Function to connect to MongoDB Atlas and perform database operations
// async function main() {
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     // Connect to the MongoDB cluster
//     await client.connect();
//     console.log('Connected to MongoDB Atlas');

//     // Specify the database to use
//     const database = client.db('blendnet_database'); // Replace '<dbname>' with your database name

//     // Specify the collection to use
//     const collection = database.collection('blendnet_collection'); // Replace '<collectionname>' with your collection name

//     // Sample data to be inserted
//     const newData = { name: 'John', age: 30, email: 'john@example.com' };

//     // Insert a single document
//     const result = await collection.insertOne(newData);
//     console.log(`Inserted ${result.insertedCount} document into the collection`);

//   } catch (error) {
//     console.error('Error occurred:', error);
//   } finally {
//     // Close the connection when finished
//     await client.close();
//     console.log('Connection to MongoDB Atlas closed');
//   }
// }

// // Call the main function
// main().catch(console.error);


import axios from "axios";

// const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${"apple"}&apikey=${"KMPOENKURRQR8FO3"}`);
// console.log(response)
try {
    const promises = ["APPL"].map(async (symbol) => {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=KDSCC5UN2I2WDQVG`);
        const data = response.data;
        console.log(data)
        if (data['Global Quote']) {
          const price = parseFloat(data['Global Quote']['05. price']);
          return { [symbol]: price };
        } else {
          return { [symbol]: null };
        }
      } catch (error) {
        console.error(`Error fetching latest price for ${symbol}:`, error);
        return { [symbol]: null };
      }
    });

    const prices = await Promise.all(promises);
    const latestPricesObj = Object.assign({}, ...prices);
    setLatestPrices(latestPricesObj);
  } catch (error) {
    console.error('Error fetching latest prices:', error);
  }