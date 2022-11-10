import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { useTranslation } from "react-i18next";

import "../i18n/i18n.js";

const Product = ({ product }) => {
  const [t, i18n] = useTranslation("lang", { useSuspense: false });

  return (
    <Card className="my-3 p-3 rounded" border="primary">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          {product && product.numReviews !== 0 && (
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          )}
        </Card.Text>

        <Card.Text as="h6">
          {product.price}
          {t("won")}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
