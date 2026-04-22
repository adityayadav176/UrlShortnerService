const dotenv = require('dotenv')
const { connectToMongo } = require('./db/db.js');
const { app } = require('./app.js');

// dotenv config
dotenv.config({
    path: "./.env"
});

// mongo port 
const port = process.env.PORT || 3000

// mongo connections to app 
connectToMongo()
.then(()=> {
    app.listen(port, () => {
        console.log(`Url Shortner app running on port ${port}`)
    })
})
.catch((error)=>{
    console.log(`MongoDb connection error : ${error}`)
})

