import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { useTranslation } from "react-i18next";

import "../i18n/i18n.js";

const ProductScreen = ({ history, match }) => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const [t, i18n] = useTranslation("lang", { useSuspense: false });

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        {t("back")}
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  {t("price")}: {product.price} ₩
                </ListGroup.Item>
                <ListGroup.Item>
                  {t("description")}: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>{t("price")} : </Col>
                      <Col>
                        <strong>{product.price} ₩</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>{t("stock")}:</Col>
                      <Col>{product.countInStock > 0 ? "有货" : "无货"}</Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>{t("how-qty")}</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroupItem>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block mt-3"
                      type="button"
                      disabled={product.countInStock === 0}
                      style={{
                        width: "100%",
                      }}
                    >
                      {t("add-cart")}
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
            {product.detailImages ? (
              <Image
                src={product.detailImages}
                alt={product.name}
                className="mx-auto mt-5 mb-5"
                fluid
              />
            ) : (
              <></>
            )}
            {product.detailImages2 ? (
              <Image
                src={product.detailImages2}
                alt={product.name}
                className="mx-auto mt-5 mb-5"
                fluid
              />
            ) : (
              <></>
            )}
            {product.detailImages3 ? (
              <Image
                src={product.detailImages3}
                alt={product.name}
                className="mx-auto mt-5 mb-5"
                fluid
              />
            ) : (
              <></>
            )}
          </Row>
          <Row>
            <Col md={6}>
              <h2>{t("review")}</h2>
              {product.reviews.length === 0 && (
                <Message>{t("no-review")}</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>{t("customer-review")}</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>{t("rating")}</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">{t("star")}..</option>
                          <option value="1">1 - {t("star-1")}</option>
                          <option value="2">2 - {t("star-2")}</option>
                          <option value="3">3 - {t("star-3")}</option>
                          <option value="4">4 - {t("star-4")}</option>
                          <option value="5">5 - {t("star-5")}</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>{t("opinion")}</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        {t("submit")}
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      请<Link to="/login">登陆</Link>写下顾客意见
                      <br />
                      작성을 위해 <Link to="/login">로그인</Link>이 필요합니다.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
