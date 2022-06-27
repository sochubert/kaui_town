import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>登陆</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>登陆</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>配送</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>配送</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>结账</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>结账</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>订单结束</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>订单结束</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
