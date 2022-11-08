import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { deleteCarousel, getCarousel } from "../actions/carouselAction";

const CarouselListScreen = () => {
  const dispatch = useDispatch();

  const carouselGet = useSelector((state) => state.carouselGet);
  const { loading, error, carousels } = carouselGet;

  const carouselDelete = useSelector((state) => state.carouselDelete);
  const { loading: loadingDelete, error: errorDelete } = carouselDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      window.push("/login");
    } else {
      dispatch(getCarousel());
    }
  }, [dispatch, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("정말로 지우겠습니까?")) {
      dispatch(deleteCarousel(id));
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>메인 이미지 관리</h1>
          <h6>반드시 하나 이상의 이미지는 남아 있어야 합니다.</h6>
        </Col>
        <Col className="text-right">
          <Button className="my-3">
            <i className="fas fa-plus"></i> 이미지 추가
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-lg">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>COMMENT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carousels &&
                carousels.map((carousel) => (
                  <tr key={carousel._id}>
                    <td>
                      <img src={carousel.image} style={{ width: "100px" }} />
                    </td>
                    <td>{carousel.description}</td>
                    <td>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(carousel._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default CarouselListScreen;
