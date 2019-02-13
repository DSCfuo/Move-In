const {Client} = require('pg')
const dotenv = require('dotenv')
const {adminTable, houseTable, ownerTable, subscribersTable, reviewsTable} = require('./tables')

dotenv.config();

const client = new Client();

const createTables = async () => {
    try{
        await client.connect();
        await client.query(adminTable),
        await client.query(ownerTable),
        await client.query(houseTable),
        await client.query(subscribersTable);
        await client.query(reviewsTable);
        await client.end()
        console.log('Tables created successfully');
        process.exit(0)
    }catch(e){
        console.log('Something bad happened', e)
    }
    
}

createTables();