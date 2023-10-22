const express = require('express')
let app = express();
const cors = require('cors');
var port = process.env.PORT || 8080;
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
app.use(cors(corsOptions));
// Welcome message
app.get('/', (req, res) => res.send('Welcome to Express'));
// Launch app to the specified port
app.listen(port, function() {
    console.log("Running FirstRest on Port "+ port);
})
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//Import routes
let apiRoutes = require("./routes")
//Use API routes in the App
app.use('/api', apiRoutes)

//import mongoose
let mongoose = require('mongoose');

//connect to mongoose
const dbPath = 'mongodb://localhost/ManCity';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})