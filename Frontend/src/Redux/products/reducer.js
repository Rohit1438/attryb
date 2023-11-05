import {
  IsError,
  IsLoading,
  PRODUCT_REQUEST,
  OEM_PRODUCT_REQUEST,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  products: [],
  isError: false,
  OEMData: [],
  commentData: [],
  totalpages: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case IsLoading:
      return { ...state, isLoading: true, isError: false };
    case IsError:
      return { ...state, isLoading: false, isError: true };

    case PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: false,
        isError: false,
        products: [...action.payload],
      };

    case OEM_PRODUCT_REQUEST:
      console.log(action.payload.post);
      const newstate = { ...state, OEMData: action.payload.post };
      console.log(newstate);
      return { isLoading: false, ...newstate };
    default:
      return state;
  }
};
