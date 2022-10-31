import axios from "axios";
import {
  SELLER_LIST_REQUEST,
  SELLER_LIST_SUCCESS,
  SELLER_LIST_FAIL,
  SELLER_DETAILS_REQUEST,
  SELLER_DETAILS_SUCCESS,
  SELLER_DETAILS_FAIL,
} from "../constants/sellerConstants";

export const listSellers = () => async (dispatch) => {
  try {
    dispatch({ type: SELLER_LIST_REQUEST });
    const { data } = await axios.get("/api/seller");
    dispatch({
      type: SELLER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELLER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSellerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_DETAILS_SUCCESS });
    const { data } = await axios.get(`/api/seller/${id}`);
    dispatch({
      type: SELLER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELLER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
