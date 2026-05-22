const mongoose =
  require("mongoose");

const ReceiptSchema =
  new mongoose.Schema({

    receiptId: String,

    registrationId: String,

    consumerName: String,

    consumerMobile: String,

    constructionName: String,

    registrationDate: String,

    registrationType: String,

    registrationQty: String,

    registrationAddress: String,

    availableQty: String,

    eligibleQty: String,

    dispatchId: String,

    tripNumber: String,

    vehicleNumber: String,

    driverName: String,

    driverMobile: String,

    dispatchQty: String,

    dispatchDate: String,

    dispatchAddress: String,

  });

module.exports =
  mongoose.model(
    "Receipt",
    ReceiptSchema
  );