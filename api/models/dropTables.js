const {Client} = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.PGDATABASE,
});

const dropTables = async () => {
    await client.connect();
    await client.query('DROP TABLE IF EXISTS admins;');
    console.log('DROPPED TABLE admins')

    await client.query('DROP TABLE IF EXISTS houses;');
    console.log('DROPPED TABLE houses');

    await client.query('DROP TABLE IF EXISTS owners;');
    console.log('DROPPED TABLE owners');

    await client.query('DROP TABLE IF EXISTS reviews;');
    console.log('DROPPED TABLE reviews');

    await client.query('DROP TABLE IF EXISTS subscribers;');
    console.log('DROPPED TABLE subscribers')

    await client.query('DROP TABLE IF EXISTS listings;');
    console.log('DROPPED TABLE listings')
    process.exit(0);
}

dropTables();