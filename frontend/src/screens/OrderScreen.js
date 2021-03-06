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

    if (!order || successPaid) {
      dispatch({ type: ORDER_PAY_RESET });
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

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId, dispatch]);

  const paidHandler = () => {
    dispatch(payOrder(order));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
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
              <h2>??????</h2>
              <p>
                <strong>??????/??????: </strong> {order.user.name}
              </p>
              <p>
                <strong>??????: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>?????? : </strong>
                {order.shippingAddress.mobile} {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}{" "}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  ???????????? {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">????????????</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>????????????</h2>
              <p>
                <strong>?????? : </strong>
                ??????
              </p>
              {order.isPaid ? (
                <Message variant="success">???????????? {order.paidAt}</Message>
              ) : (
                <Message variant="danger">???????????????</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>????????????</h2>
              {order.orderItems.length === 0 ? (
                <Message>????????????</Message>
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
                          {item.qty} x {item.price} ??? = {item.qty * item.price}{" "}
                          ???
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
                <h2>????????????</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>??????</Col>
                  <Col>{order.itemsPrice} ???</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>?????????</Col>
                  <Col>{order.shippingPrice} ???</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>??????</Col>
                  <Col>{order.totalPrice} ???</Col>
                </Row>
              </ListGroup.Item>
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    ???????????? ??????
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
                    ???????????? ??????
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
