import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  deliverOrder,
  payOrder,
} from "../actions/orderActions";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import { useTranslation } from "react-i18next";

import "../i18n/i18n.js";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [t, i18n] = useTranslation("lang", { useSuspense: false });

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  useEffect(() => {
    const addNicepayScript = async () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://pay.nicepay.co.kr/v1/js/";
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!userInfo) {
      history.push("/login");
    }

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.nicepay) {
        addNicepayScript();
      } else {
        setSdkReady(true);
      }
    }
    if (!order || successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, successPay, successDeliver, order, history, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId, dispatch]);

  // 관리자 강제 결제 완료 처리
  const paidHandler = () => {
    dispatch(payOrder(order));
  };

  // 관리자 강제 배송 완료 처리
  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const payOrderHandler = async () => {
    const { AUTHNICE } = window;
    AUTHNICE.requestPay({
      clientId: "S2_e98a8b476d4d4defb2daea9082d3e928",
      method: "card",
      orderId: order._id,
      amount: order.totalPrice,
      goodsName: "Kaui Town",
      returnUrl: "http://localhost:3000/api/orders/nicepay/serverAuth",
      fnError: function (result) {
        alert(result.errorMsg);
      },
    });
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>
        {t("order-number")} {order._id}
      </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{t("shipping")}</h2>
              <p>
                <strong>{t("name-or-nickname")}: </strong> {order.user.name}
              </p>
              <p>
                <strong>{t("email")}: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>{t("address")} : </strong>
                {order.shippingAddress.mobile} {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}{" "}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  {t("delivered-start")} {order.deliveredAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="danger">{t("delivered-ready")}</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{t("payment-method")}</h2>
              <p>
                <strong>{t("payment-method")} : </strong>
                {t("transfer")}
                <br />
                입금계좌(收款账户) NH농협은행 302-1715-9713-21
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  {t("paid-time")} {order.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="danger">{t("paid-checking")}</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{t("order-list")}</h2>
              {order.orderItems.length === 0 ? (
                <Message>{t("order-empty")}</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} ₩ = {item.qty * item.price}{" "}
                          ₩
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{t("order-summary")}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>{t("price")}</Col>
                  <Col>{order.itemsPrice} ₩</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>{t("shipping-fee")}</Col>
                  <Col>{order.shippingPrice} ₩</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>{t("total-price")}</Col>
                  <Col>{order.totalPrice} ₩</Col>
                </Row>
              </ListGroup.Item>
              {/* {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <Button onClick={payOrderHandler}>결제하기</Button>
                  )}
                </ListGroup.Item>
              )} */}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    발송완료 처리
                  </Button>
                </ListGroup.Item>
              )}
              {loadingPay && <Loader />}
              {userInfo && userInfo.isAdmin && !order.isPaid && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={paidHandler}
                  >
                    결제확인 처리
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
