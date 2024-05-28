const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(morgan('common'));
app.use(bodyParser.json());

let origin = 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') {
    origin = process.env.CORS_ORIGIN;
}

app.use(cors({
    credentials: true,
    origin
}));

app.use('/', require('./routes/Vehicles'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});