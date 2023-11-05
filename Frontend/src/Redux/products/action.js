import axios from "axios";
import {
  IsError,
  IsLoading,
  PRODUCT_REQUEST,
  OEM_PRODUCT_REQUEST,

} from "./actionTypes";
const Url = "https://buycar2.onrender.com/api/v1/cars";

export const getProducts = (obj, page) => (dispatch) => {
 
  dispatch({ type: IsLoading });
  axios
    .get(`${Url}`)
    .then((data) => {

//console.log(data,"from frontend")
      dispatch({ type: PRODUCT_REQUEST, payload: data.data });
    })
    .catch((error) => {
      dispatch({ type: IsError });
    });
};

export const getOEMProducts = () => (dispatch) => {

  dispatch({ type: IsLoading });
  axios
    .get(`${Url}/oem`)
    .then((data) => {
      dispatch({ type: OEM_PRODUCT_REQUEST, payload: data.data });
      
    })
    .catch((error) => {
      dispatch({ type: IsError });
    });
};
