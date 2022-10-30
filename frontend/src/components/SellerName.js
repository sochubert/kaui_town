import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listSellerDetails } from "../actions/sellerAction";
import Loader from "./Loader";
import Message from "./Message";

const SellerName = (id) => {
  const sellerDetails = useSelector((state) => state.sellerDetails);
  const { loading, error, seller } = sellerDetails;

  const sellerId = JSON.stringify(id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listSellerDetails(sellerId));
  });

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
