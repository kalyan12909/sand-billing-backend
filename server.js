const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const receiptRoutes =
  require("./routes/receiptRoutes");

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());


// MONGODB CONNECTION

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "MongoDB Connected"
    );

  })
  .catch((err) => {

    console.log(err);

  });


// SCHEMA

const billSchema =
  new mongoose.Schema({

    orderId: String,

    tripNo: String,

    customerName: String,

    customerMobile: String,

    sandQuantity: String,

    vehicleNo: String,

    driverName: String,

    dispatchDate: String,

    address: String,

  });


// MODEL

const Bill =
  mongoose.model(
    "Bill",
    billSchema
  );


// ROUTES

app.use(
  "/api/receipt",
  receiptRoutes
);


// SAVE BILL

app.post(
  "/api/bills",
  async (req, res) => {

    try {

      const newBill =
        new Bill(req.body);

      await newBill.save();

      res.status(201).json({

        success: true,

        data: newBill,

      });

    } catch (error) {

      res.status(500).json({

        error:
          error.message,

      });

    }

  }
);


// GET ALL BILLS

app.get(
  "/api/bills",
  async (req, res) => {

    try {

      const bills =
        await Bill.find().sort({
          _id: -1
        });

      res.json(bills);

    } catch (error) {

      res.status(500).json({

        error:
          error.message,

      });

    }

  }
);


// GET SINGLE BILL

app.get(
  "/api/bills/:id",
  async (req, res) => {

    try {

      const bill =
        await Bill.findById(
          req.params.id
        );

      res.json(bill);

    } catch (error) {

      res.status(500).json({

        error:
          error.message,

      });

    }

  }
);


app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );

});