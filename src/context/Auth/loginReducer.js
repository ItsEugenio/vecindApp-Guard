export const initialLoginState = {
    email: "",
    password: "",
  };
  
  export function loginReducer(state, action) {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.payload.name]: action.payload.value };
      case "RESET":
        return initialLoginState;
      default:
        return state;
    }
  }
  