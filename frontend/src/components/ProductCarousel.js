import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { getCarousel } from "../actions/carouselAction";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const carouselGet = useSelector((state) => state.carouselGet);
  const { loading, error, carousels } = carouselGet;

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-light mx-2">
      {carousels.map((carousel) => (
        <Carousel.Item key={carousel._id}>
          <Image src={carousel.image} alt="main-img" fluid />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
