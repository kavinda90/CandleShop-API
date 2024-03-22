const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/index')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 9000;
const dbUri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());
app.use('/', router);

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open", () => {
 console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
 console.log(`Server is running on port: ${port}`);
});