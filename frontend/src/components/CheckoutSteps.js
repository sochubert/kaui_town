import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useTranslation } from "react-i18next";

import "../i18n/i18n.js";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const [t, i18n] = useTranslation("lang", { useSuspense: false });

  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>{t("login")}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{t("login")}</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>{t("shipping")}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{t("shipping")}</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>{t("payment")}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{t("payment")}</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>{t("order-compelete")}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{t("order-compelete")}</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
