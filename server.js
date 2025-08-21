const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your Atlas connection string)
mongoose.connect("mongodb+srv://helloworldzz123:Kalyan100@billsgenerated.zm8h8il.mongodb.net/billing?retryWrites=true&w=majority&appName=billsGenerated")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Schema
const BillSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  tripNo: { type: String, required: true },
  customerName: { type: String, required: true },
  sandQuantity: { type: String, required: true },
  date: { type: Date, default: Date.now } 
});


const Bill = mongoose.model("Bill", BillSchema);

app.post("/api/bills", async (req, res) => {
  const bill = new Bill(req.body);
  await bill.save();
  res.json({ message: "Bill saved", bill });
});

app.get("/api/bills", async (req, res) => {
  const bills = await Bill.find();
  res.json(bills);
});

app.listen(5000, () => console.log("Server running on port 5000"));
