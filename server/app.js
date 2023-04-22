const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
const userRoutes=require('./routes/users');
const User = require("./models/users");
const PORT= 8000
app.use('/',userRoutes);

app.listen(PORT, () => {
    console.log(`port is listening on ${PORT}`);
})