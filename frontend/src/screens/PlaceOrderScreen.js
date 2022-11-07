import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { useTranslation } from "react-i18next";

import "../i18n/i18n.js";

const PlaceOrderScreen = ({ history }) => {
  const [t, i18n] = useTranslation("lang", { useSuspense: false });
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  // Calculate prices

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // 일정 금액 이상 무료 설정
  // cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
  cart.shippingPrice = 3100;
  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{t("shipping")}</h2>
              <p>
                <strong>地址 : </strong>
                {cart.shippingAddress.mobile},{cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city}{" "}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{t("payment-method")}</h2>
              <strong>{t("method")} : </strong>
              {t("transfer")}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{t("order-summary")}</h2>
              {cart.cartItems.length === 0 ? (
                <Message>{t("shopping-cart-empty")}</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
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
                <h2>{t("order-compelete")}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>{t("price")}</Col>
                  <Col>{cart.itemsPrice} ₩</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>{t("shipping-fee")}</Col>
                  <Col>{cart.shippingPrice} ₩</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>{t("total-price")}</Col>
                  <Col>{cart.totalPrice} ₩</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                  style={{ width: "100%" }}
                >
                  {t("order-end")}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
