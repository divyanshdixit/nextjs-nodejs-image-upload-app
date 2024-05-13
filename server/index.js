const express = require('express');
const cors = require('cors');
const multer = require('multer');
const userRoutes = require('./routes');
const bodyParser = require('body-parser');
const checkimage = require('./middleware');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 8081;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL)

app.use('/api/uploadimage', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})