import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = ({ history }) => {
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
      <h1>配送</h1>
      请务必输入正确的手机号码。目前只运营配送服务,
      因此通过短信提供配送相关通知。 不输入地址也没关系。
      <Form.Group controlId="postalCode">
        <Form.Label>手机号码</Form.Label>
        <Form.Control
          type="text"
          placeholder="
            输入手机号码"
          value={mobile}
          required
          onChange={(e) => setMobile(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>地址</Form.Label>
          <Form.Control
            type="text"
            placeholder="输入地址"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>城市</Form.Label>
          <Form.Control
            type="text"
            placeholder="输入城市"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          继续
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
