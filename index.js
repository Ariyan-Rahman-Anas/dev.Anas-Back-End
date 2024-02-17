const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5001;
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");


//middleware
app.use(cors())
app.use(express.json());

//copied from mongodb atlas
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.toh0ohl.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    //db-connections
    const credentialsCollection = client
      .db("Credentials-of-Anas")
      .collection("Credentials");

    //getting all credentials
    app.get("/credentials", async (req, res) => {
      const result = await credentialsCollection.find().toArray();
      res.send(result);
    });

    //getting credentials details for credentials details page
    app.get("/credentials/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await credentialsCollection.findOne(query);
      res.send(result);
    });

    // storing all of credentials
    app.post("/credentials", async (req, res) => {
      const credential = req.body;
      const result = await credentialsCollection.insertOne(credential);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
//copied from mongodb atlas


//server testing
app.get("/", (req, res) => {
  res.send("Ariyna Rahman Anas's portfolio server is running...");
});

app.listen(port, () => {
  console.log(`Ariyan Rahman Anas's portfolio Server is running on Port:  ${port}`);
});