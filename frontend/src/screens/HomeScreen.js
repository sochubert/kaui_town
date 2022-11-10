import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import ProductCarousel from "../components/ProductCarousel";
import { useTranslation } from "react-i18next";

import "../i18n/i18n.js";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const [t, i18n] = useTranslation("lang", { useSuspense: false });

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          {t("back")}
        </Link>
      )}
      <h1 className="mt-3">{t("recent-products")}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.length === 0 ? (
              <Message variant="danger">
                오류가 발생하였습니다.(查无此物)
              </Message>
            ) : (
              products.map((product) => (
                <Col key={product._id} xs={6} sm={6} md={6} lg={4} xl={3}>
                  <div
                    style={{
                      "background-color": "white",
                    }}
                  >
                    <Product product={product} />
                  </div>
                </Col>
              ))
            )}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
