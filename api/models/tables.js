exports.adminTable = `
CREATE TABLE IF NOT EXISTS admins(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(256) NOT NULL,
    salt VARCHAR(128) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

exports.houseTable = `
CREATE TABLE IF NOT EXISTS houses(
    id SERIAL,
    location VARCHAR(128) NOT NULL,
    price INTEGER NOT NULL,
    apartmentType VARCHAR(128) NOT NULL,
    status INTEGER DEFAULT 1,
    description VARCHAR(128) NOT NULL,
    address VARCHAR(128) NOT NULL,
    image_url VARCHAR(128) NOT NULL,
    image_id VARCHAR(128) NOT NULL,
    owner_id INTEGER REFERENCES owners(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

exports.listingsTable = `
CREATE TABLE IF NOT EXISTS listings(
    id SERIAL,
    location VARCHAR(128) NOT NULL,
    price INTEGER NOT NULL,
    apartmentType VARCHAR(128) NOT NULL,
    status INTEGER DEFAULT 1,
    description VARCHAR(128) NOT NULL,
    address VARCHAR(128) NOT NULL,
    image_url VARCHAR(128) NOT NULL,
    image_id VARCHAR(128) NOT NULL,
    owner_name VARCHAR(128) NOT NULL,
    owner_email VARCHAR(128) NOT NULL,
    owner_phone VARCHAR(128) NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)`

exports.ownerTable = `
CREATE TABLE IF NOT EXISTS owners(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    phone VARCHAR(128) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

exports.subscribersTable = `
CREATE TABLE IF NOT EXISTS subscribers(
    id SERIAL,
    email VARCHAR(128) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

exports.reviewsTable = `
CREATE TABLE IF NOT EXISTS reviews(
    id SERIAL,
    rating INTEGER NOT NULL,
    review VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;
