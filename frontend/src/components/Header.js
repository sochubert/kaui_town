import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import { useTranslation } from "react-i18next";

import "../i18n/i18n.js";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };

  const [t, i18n] = useTranslation("lang", { useSuspense: false });

  return (
    <header>
      <Navbar
        style={{ backgroundColor: "#960018" }}
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <div className="on__mobile__lang__btn">
            <button
              onClick={() => i18n.changeLanguage("ko")}
              className="lang_button"
            >
              🇰🇷
            </button>
            <button
              onClick={() => i18n.changeLanguage("cn")}
              className="lang_button"
            >
              🇨🇳
            </button>
          </div>
          <LinkContainer to="/">
            <Navbar.Brand>Kuai Town</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <div className="on__pc__lang__btn">
              <button
                onClick={() => i18n.changeLanguage("ko")}
                className="lang_button"
              >
                🇰🇷
              </button>
              <button
                onClick={() => i18n.changeLanguage("cn")}
                className="lang_button"
              >
                🇨🇳
              </button>
            </div>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to={"/cart"}>
                <i className="fas fa-shopping-cart"></i> {t("shopping-cart")}
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>{t("profile")}</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    {t("logout")}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to={"/login"}>
                  <i className="fas fa-user"></i> {t("login")}
                </Nav.Link>
              )}
              {userInfo && userInfo.isSeller && (
                <NavDropdown title="판매자 모드" id="sellermenu">
                  <LinkContainer to="/seller/productlist">
                    <NavDropdown.Item>상품관리</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/seller/orderlist">
                    <NavDropdown.Item>주문관리</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="관리자 모드" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>유저관리</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>상품관리</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>주문관리</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/account">
                    <NavDropdown.Item>정산관리</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
