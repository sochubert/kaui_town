import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listSellerDetails } from "../actions/sellerAction";
import Loader from "./Loader";
import Message from "./Message";

const SellerName = ({ id }) => {
  const sellerDetails = useSelector((state) => state.sellerDetails);
  const { loading, error, seller } = sellerDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listSellerDetails(id));
  }, [id]);

  console.log(seller && seller);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">오류</Message>
      ) : (
        <>{seller && seller.name}</>
      )}
    </>
  );
};

export default SellerName;
