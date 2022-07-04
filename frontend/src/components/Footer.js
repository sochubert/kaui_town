import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; 2022 HeadingWarm <br />
            <br />
            <p className="footer-info">
              상호명 : 헤딩웜 | 사업자등록번호 : 845-08-01863 <br />
              통신판매업 : 제 2022-경기안산-1988 호 | 대표 : 정지윤 <br />
              주소 : 경기도 안산시 상록구 한양대학로 55, 제5공학관 창업실 4호실
              <br />
              이메일 : headingwarm10@gmail.com
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
