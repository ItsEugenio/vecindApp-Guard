// registerReducer.js

export const initialRegisterState = {
    email: "",
    password: "",
  };
  
  export function registerReducer(state, action) {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.payload.name]: action.payload.value };
      case "RESET":
        return initialRegisterState;
      default:
        return state;
    }
  }
  