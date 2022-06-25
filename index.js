require('dotenv').config();

const express = require("express");
const path = require("path");

//const keys = require('./keys');

const todoRouter = require('./routes/todo');
const { isEnvDev } = require("./utils");
const sequelize = require("./utils/db");

const app = express();

// USE
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//app.use((_, res) => res.sendFile('/index.html') );

// ROUTES
app.use('/api/todo', todoRouter);

// START
async function start() {
	try {
		/**
		 * DROP DATABASE
		 * sequelize.sync({force: true});
		 */

		sequelize.sync();

		const PORT = process.env.PORT || 8003;
		
		app.listen(PORT, _ => {
			if (isEnvDev()) {
				console.log(`Starts on http://localhost:${PORT}/`);

			} else {
				console.log(`Starts on ${PORT} PORT.`);
			}
		});

	} catch (error) { console.log(error); }
}

start();