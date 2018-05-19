import { ADD_PROMO } from "../constants/index";

const initialState = {
  cartItems: [],
  checked: false,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROMO:
      return { ...state, cartItems: [...state.cartItems, action.payload], 
        checked: action.checked };
    default:
      return state;
  }
};

export default rootReducer;