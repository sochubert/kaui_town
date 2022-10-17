import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";
import { useTranslation } from "react-i18next";

import "../i18n/i18n.js";

const ShippingScreen = ({ history }) => {
  const [t, i18n] = useTranslation("lang", { useSuspense: false });

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [mobile, setMobile] = useState(shippingAddress.mobile);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ mobile, address, city }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>{t("shipping")}</h1>
      {t("shipping-message")}
      <Form.Group controlId="postalCode">
        <Form.Label>{t("phone-number")}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t("phone-number-placeholder")}
          value={mobile}
          required
          onChange={(e) => setMobile(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>{t("address")}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t("address-placeholder")}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>{t("address1")}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t("address-placeholder")}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-5 mb-5"
          style={{ width: "100%" }}
        >
          {t("process")}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
