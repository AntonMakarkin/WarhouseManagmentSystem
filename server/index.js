const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoute = require('./routes/admin');
const dotenv = require('dotenv');

const app = express();
dotenv.config()

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use(adminRoute);

app.get('/', (req, res) => {
    res.send('App is running')
})

const CONNECTION_URL = process.env.MONGODB_URL
const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)
