const app = require("./src/app")

require('dotenv').config();
const client = require('./src/database/connection')


const PORT = process.env.PORT || 3000;
app.listen(3000, ()=>{
    console.log(`Server is running on port ${PORT}`);
});