import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [detailImages, setDetailImages] = useState("");
  const [detailImages2, setDetailImages2] = useState("");
  const [detailImages3, setDetailImages3] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [hashTags, setHashTags] = useState([]);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [detailUploading, setDetailUploading] = useState(false);
  const [detailUploading2, setDetailUploading2] = useState(false);
  const [detailUploading3, setDetailUploading3] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      userInfo.isAdmin
        ? history.push("/admin/productlist")
        : history.push("/seller/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setDetailImages(product.detailImages);
        setDetailImages2(product.detailImages2);
        setDetailImages3(product.detailImages3);
        setBrand(product.brand);
        setHashTags(product.hashTags);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const uploadDetailFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("detailImages", file);
    setDetailUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/upload/detailImages",
        formData,
        config
      );

      setDetailImages(data);
      setDetailUploading(false);
    } catch (error) {
      console.error(error);
      setDetailUploading(false);
    }
  };

  const uploadDetailFileHandler2 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("detailImages2", file);
    setDetailUploading2(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/upload/detailImages2",
        formData,
        config
      );

      setDetailImages2(data);
      setDetailUploading2(false);
    } catch (error) {
      console.error(error);
      setDetailUploading2(false);
    }
  };

  const uploadDetailFileHandler3 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("detailImages3", file);
    setDetailUploading3(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/upload/detailImages3",
        formData,
        config
      );

      setDetailImages3(data);
      setDetailUploading3(false);
    } catch (error) {
      console.error(error);
      setDetailUploading3(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        detailImages,
        detailImages2,
        detailImages3,
        brand,
        hashTags,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        뒤로가기
      </Link>
      <FormContainer>
        <h1>상품 관리</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>상품명</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>가격</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>상품 메인 이미지</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Control
              type="file"
              id="image-file"
              label="Choose File"
              custom="true"
              onChange={uploadFileHandler}
            ></Form.Control>
            {uploading && <Loader />}

            <Form.Group controlId="detailImages">
              <Form.Label>상품 상세 이미지</Form.Label>
              <Form.Control
                type="text"
                placeholder="Detail Image URL"
                value={detailImages}
                onChange={(e) => setDetailImages(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Control
              type="file"
              id="image-file"
              label="Choose File"
              custom="true"
              onChange={uploadDetailFileHandler}
            ></Form.Control>
            {detailUploading && <Loader />}

            <Form.Group controlId="detailImages2">
              <Form.Label>상품 상세 이미지2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Detail Image URL"
                value={detailImages2}
                onChange={(e) => setDetailImages2(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Control
              type="file"
              id="image-file"
              label="Choose File"
              custom="true"
              onChange={uploadDetailFileHandler2}
            ></Form.Control>
            {detailUploading2 && <Loader />}

            <Form.Group controlId="detailImages3">
              <Form.Label>상품 상세 이미지</Form.Label>
              <Form.Control
                type="text"
                placeholder="Detail Image URL"
                value={detailImages3}
                onChange={(e) => setDetailImages3(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Control
              type="file"
              id="image-file"
              label="Choose File"
              custom="true"
              onChange={uploadDetailFileHandler3}
            ></Form.Control>
            {detailUploading3 && <Loader />}

            <Form.Group controlId="hashTags">
              <Form.Label>해시태그(관련 상품 추천용)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter hashTags"
                value={hashTags}
                onChange={(e) => setHashTags(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>브랜드</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>재고량</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>카테고리</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>상품 설명</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              업데이트
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
