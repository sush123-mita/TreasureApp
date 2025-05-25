const dotenv=require('dotenv');

const result=dotenv.config();
if(result.error){
  console.error(".env loading error",result.error);
}
else{
  console.log(".env loaded:",Object.keys(result.parsed));
}
const path=require("path")
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require('http');
const themeroutes = require("C:/Users/sushm/Desktop/Backend PRo/Server/Themeroutes.js/routes");

// Debug: Check if .env loaded correctly
console.log("[DEBUG] MONGO_URI:", process.env.MONGO_URI); // Should NOT be undefined

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Treasure", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(" MongoDB connected"))
.catch(err => console.log(" MongoDB connection error:", err));

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api",themeroutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));