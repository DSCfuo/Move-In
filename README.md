# :house: Move-In
An apartment rental application which allows property owners and proposed tenants to transact efficiently.

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)


![alt text](https://github.com/georgeben/Move-In/blob/development/screenshots/home.png "Homepage screenshot")

![alt text](https://github.com/georgeben/Move-In/blob/development/screenshots/dashboard.PNG "Dashboard screenshott")

## Technologies
- :boom: Node
- :fire: Express
- :zap: Vue.js
- :sparkles: Vuetify
- :elephant: PostgreSQL

## Features
- Material UI with Vuetify
- Image upload and storage with cloudinary
- Sending promotional mails to customers with cron jobs
- Search for apartments based on location, budget and type.
- Submit listings of apartments to be leased
- A fully functional admin dashboard

## :book: Set up
Here are the steps you need to follow to set up this project on your local machine.
1. Clone this repo by running `git clone https://github.com/georgeben/Move-In`
2. `cd` into the cloned repo, then `cd` into the `server` folder.
3. Create a new PostgreSQL database
4. Create a .env file and input the datails for connecting to your database namely PGUSER( database user), PGPASSWORD (database user password),
PGDATABASE (Name of the database), PGHOST (localhost), PGPORT (connection port) or you can manually input these env variables into your terminal.
5. After your databse is set up. Run `npm install` to install all the dependencies.
6. Run `npm run db:create` to create the database tables
7. Start the server with `npm run start` and the server sjould be live on localhost:3000. :zap:
8. Open another terminal window and `cd` into the client folder.
9. Run `npm install` to install all dependencies.
10. Run `npm run serve` to start the dev server.
11. View the vue app on localhost:8080. :tada:

## Setting up  cloudinary :cloud:
1. Create a cloudinary account [here](https://cloudinary.com/)
2. Add your CLOUD_NAME, API_KEY and API_SECRET to your .env file.
3. When images have been uploaded, log into your cloudinary dashboard to view them. :tada:

## Setting up mailer
The application uses gmail to send emails. To set up the mailer,
1. Add your gmail email and password to your .env file
2. Tweak the node cron scheduler to schedule intervals at the time you prefer :tada:

## Contributing
Contributions are welcome. Feel free to send in your pull requests.

## Author
[George Benjamin](https://github.com/georgeben) :heart:
