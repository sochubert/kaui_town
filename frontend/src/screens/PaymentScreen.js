import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import { useTranslation } from "react-i18next";

import "../i18n/i18n.js";

const PaymentScreen = ({ history }) => {
  const [t, i18n] = useTranslation("lang", { useSuspense: false });
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>{t("payment-method")}</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">{t("payment-select")}</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label={t("transfer")}
              id="转账"
              name="paymentMethod"
              value="转账"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-4"
          style={{ width: "100%" }}
        >
          {t("process")}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
