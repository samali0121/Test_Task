const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes')

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

//Register Routes here 
app.use('/user', routes)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
