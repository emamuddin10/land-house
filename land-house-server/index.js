const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const app = express();
const port = 5000;

// middle ware
app.use(express.json())
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))





// const uri= "mongodb://localhost:27017/"

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ytj0kf8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("insertProperty");
    const propertCollection = database.collection("propertyCollection")


    // create a jwt
    app.post("/jwt",async(req,res)=>{
      const user = req.body;
      console.log(user)
    })
    // get all property from mongo
    app.get("/getAllProperty",async(req,res)=>{
      const cursor = await propertCollection.find({})
      const result = await cursor.toArray()
      res.send(result)
    })

    // add to property in db
    app.post('/addProperty',async(req,res)=>{
        const property = req.body;
        console.log(property)
        const result = await propertCollection.insertOne(property);
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send("my land house server is running")
})

app.listen(port,()=>{
    console.log(`land house server port is ${port}`)
})

