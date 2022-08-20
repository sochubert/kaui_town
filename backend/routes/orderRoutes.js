import express from "express";
import got from "got";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const clientId = process.env.NICEPAY_CLIENT_ID;
const secretKey = process.env.NICEPAY_SECRET_KEY;

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, admin, updateOrderToPaid);
router.route("/nicepay").put(protect, updateOrderToPaid);
router.get("/nicepay/cancel", function (req, res) {
  res.render("cancel");
});
router.post("/nicepay/serverAuth", function (req, res) {
  got
    .post("https://sandbox-api.nicepay.co.kr/v1/payments/" + req.body.tid, {
      headers: {
        Authorization:
          "Basic " + Buffer.from(clientId + ":" + secretKey).toString("base64"),
        "Content-Type": "application/json",
      },
      json: {
        amount: req.body.amount,
      },
      responseType: "json",
    })
    .then(function (response) {
      console.log(response.body);

      res.render("response", {
        resultMsg: response.body.resultMsg,
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log(req.body);
});

router.post("/nicepay/cancel", function (req, res) {
  got
    .post(
      "https://sandbox-api.nicepay.co.kr/v1/payments/" +
        req.body.tid +
        "/cancel",
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(clientId + ":" + secretKey).toString("base64"),
          "Content-Type": "application/json",
        },
        json: {
          amount: req.body.amount,
          reason: "test",
          orderId: uuid(),
        },
        responseType: "json",
      }
    )
    .then(function (response) {
      console.log(response.body);
      // 결제 비즈니스 로직 구현

      res.render("response", {
        resultMsg: response.body.resultMsg,
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log(req.body);
});

router.post("/nicepay/hook", function (req, res) {
  console.log(req.body);
  if (req.body.resultCode == "0000") {
    res.status(200).send("ok");
  }
  res.status(500).send("fail");
});

router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
