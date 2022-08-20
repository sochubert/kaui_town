import React, { useEffect } from "react";
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
import axios from "axios";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPaid = useSelector((state) => state.orderPaid);
  const { loading: loadingPaid, success: successPaid } = orderPaid;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addNicepayScript = async () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://pay.nicepay.co.kr/v1/js/";
      script.async = true;
      setTimeout(() => {
        document.body.appendChild(script);
      }, 500);
    };

    addNicepayScript();

    if (!order || successPaid || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
    if (!order || successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [
    dispatch,
    orderId,
    successPaid,
    successDeliver,
    order,
    history,
    userInfo,
  ]);

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
      clientId: "R2_5139e0b9b9534858b36512076c2100fe",
      method: "card",
      orderId: order._id,
      amount: order.totalPrice,
      goodsName: "Kaui Town",
      returnUrl: `http://localhost:5001/api/orders/nicepay/serverAuth`,
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
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>配送</h2>
              <p>
<<<<<<< HEAD
                <strong>姓名/昵称: </strong> {order.user.name}
=======
                <strong>姓名: </strong> {order.user.name}
>>>>>>> 329d3b6 (Chinese)
              </p>
              <p>
                <strong>邮箱: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>地址 : </strong>
<<<<<<< HEAD
                {order.shippingAddress.mobile} {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}{" "}
=======
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
>>>>>>> 329d3b6 (Chinese)
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  配送时间 {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">准备发货</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>付款方式</h2>
              <p>
                <strong>方式 : </strong>
<<<<<<< HEAD
                转账
=======
                {order.paymentMethod}
>>>>>>> 329d3b6 (Chinese)
              </p>
              {order.isPaid ? (
                <Message variant="success">付款时间 {order.paidAt}</Message>
              ) : (
                <Message variant="danger">结账确认中</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>订单项目</h2>
              {order.orderItems.length === 0 ? (
                <Message>没有订单</Message>
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
                <h2>订单汇总</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>价格</Col>
                  <Col>{order.itemsPrice} ₩</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>配送费</Col>
                  <Col>{order.shippingPrice} ₩</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>合计</Col>
                  <Col>{order.totalPrice} ₩</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={payOrderHandler}
                  >
                    결제하기
                  </Button>
                </ListGroup.Item>
              )}
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
              {loadingPaid && <Loader />}
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
