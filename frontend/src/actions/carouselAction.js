import axios from "axios";
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

export const createCarousel =
  (image, description) => async (dispatch, getState) => {
    try {
      dispatch({ type: CAROUSEL_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/carousel",
        image,
        description,
        config
      );

      dispatch({ type: CAROUSEL_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CAROUSEL_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCarousel = () => async (dispatch) => {
  try {
    dispatch({ type: CAROUSEL_GET_REQUEST });
    const { data } = await axios.get("/api/carousel");
    dispatch({ type: CAROUSEL_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CAROUSEL_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCarousel = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAROUSEL_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/carousel/${id}`, config);

    dispatch({ CAROUSEL_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: CAROUSEL_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
