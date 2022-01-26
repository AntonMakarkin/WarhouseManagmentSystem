const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const adminRoute = require('./routes/admin');
const courierRoute = require('./routes/couriers');
const customerRoute = require('./routes/customer');
const managerRoute = require('./routes/manager');
const storeKeeperRoute = require('./routes/storeKeepers');
const brandRoute = require('./routes/brands');
const categoryRoute = require('./routes/categories');
const tokensRoute = require('./routes/tokens');
const dotenv = require('dotenv');

const app = express();
dotenv.config()

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(adminRoute);
app.use(tokensRoute);
app.use(courierRoute);
app.use(customerRoute);
app.use(storeKeeperRoute);
app.use(managerRoute);
app.use(brandRoute);
app.use(categoryRoute);


app.get('/', (req, res) => {
    res.send('App is running');
})

const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
