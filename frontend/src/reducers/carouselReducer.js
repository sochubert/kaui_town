import {
  CAROUSEL_CREATE_REQUEST,
  CAROUSEL_CREATE_SUCCESS,
  CAROUSEL_CREATE_FAIL,
  CAROUSEL_GET_REQUEST,
  CAROUSEL_GET_SUCCESS,
  CAROUSEL_GET_FAIL,
  CAROUSEL_DELETE_REQUEST,
  CAROUSEL_DELETE_SUCCESS,
  CAROUSEL_DELETE_FAIL,
} from "../constants/carouselConstants";

export const carouselCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CAROUSEL_CREATE_REQUEST:
      return {
        loading: true,
      };
    case CAROUSEL_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        carousel: action.payload,
      };
    case CAROUSEL_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const carouselGetReducer = (state = { carousels: [] }, action) => {
  switch (action.type) {
    case CAROUSEL_GET_REQUEST:
      return {
        loading: true,
      };
    case CAROUSEL_GET_SUCCESS:
      return {
        loading: false,
        carousels: action.payload,
      };
    case CAROUSEL_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const carouselDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CAROUSEL_DELETE_REQUEST:
      return { loading: true };
    case CAROUSEL_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CAROUSEL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
