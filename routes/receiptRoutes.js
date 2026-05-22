const express =
  require("express");

const router =
  express.Router();

const { v4: uuidv4 } =
  require("uuid");

const Receipt =
  require("../models/Receipt");


// SAVE RECEIPT

router.post("/", async (req, res) => {

  try {

    const receiptId =
      uuidv4().replace(/-/g, "");

    const receipt =
      await Receipt.create({

        receiptId,

        ...req.body,

      });

    res.json({

      success: true,

      receiptId,

      qrUrl:
        `http://localhost:4200/receipt/${receiptId}`,

      data: receipt,

    });

  } catch (error) {

    res.status(500).json({

      error:
        error.message,

    });
  }
});


// GET RECEIPT

router.get("/:id", async (req, res) => {

  try {

    const receipt =
      await Receipt.findOne({

        receiptId:
          req.params.id,

      });

    if (!receipt) {

      return res.status(404).json({

        error:
          "Receipt not found",

      });
    }

    res.json(receipt);

  } catch (error) {

    res.status(500).json({

      error:
        error.message,

    });
  }
});

module.exports = router;