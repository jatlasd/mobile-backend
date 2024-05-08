const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

const entryRoute = require('./routes/entries');
const symptomRoute = require('./routes/symptoms');
const triggerRoute = require('./routes/triggers');

require("dotenv").config();

app.use(bodyParser.json());

let isConnected = false;

 const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  const currentState = mongoose.connection.readyState;

  if (currentState === 1) {
    if (!isConnected) {
      isConnected = true;
    }
    return;
  } else if (currentState === 2) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "tracking",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

connectToDB()

// Routes
app.use('/entries', entryRoute);
app.use('/symptoms', symptomRoute);
app.use('/triggers', triggerRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
