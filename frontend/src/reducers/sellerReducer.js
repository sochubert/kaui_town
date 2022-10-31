import {
  SELLER_LIST_REQUEST,
  SELLER_LIST_SUCCESS,
  SELLER_LIST_FAIL,
  SELLER_DETAILS_REQUEST,
  SELLER_DETAILS_SUCCESS,
  SELLER_DETAILS_FAIL,
} from "../constants/sellerConstants";

export const sellerListReducer = (state = { sellers: [] }, action) => {
  switch (action.type) {
    case SELLER_LIST_REQUEST:
      return { loading: true };
    case SELLER_LIST_SUCCESS:
      return {
        loading: false,
        sellers: action.payload,
      };
    case SELLER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_DETAILS_REQUEST:
      return { loading: true };
    case SELLER_DETAILS_SUCCESS:
      return {
        loading: false,
        seller: action.payload,
      };
    case SELLER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
