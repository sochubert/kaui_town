import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { useTranslation } from "react-i18next";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const [t, i18n] = useTranslation("lang", { useSuspense: false });

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setMessage("密码太短，英文+数字结合，请设置8位以上！");
    } else {
      if (password !== confirmPassword) {
        setMessage("密码错误");
      } else {
        dispatch(register(name, email, password));
      }
    }
  };

  return (
    <FormContainer>
      <h1>{t("register")}</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>{t("name-or-nickname")}</Form.Label>
          <Form.Control
            type="name"
            placeholder={t("name-placeholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>{t("email-address")}</Form.Label>
          <Form.Control
            type="email"
            placeholder={t("email-address")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>{t("password")}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t("password-placeholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>{t("password-confirm")}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t("password-confirm")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          style={{ width: "100%" }}
        >
          {t("register")}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          {t("registered")}
          {"   "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            {t("login")}
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
