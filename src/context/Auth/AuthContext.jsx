import { createContext, useContext, useReducer, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

// Importamos los reducers separados
import { loginReducer, initialLoginState } from "./loginReducer";
import { registerReducer, initialRegisterState } from "./registerReducer";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loginState, loginDispatch] = useReducer(loginReducer, initialLoginState);
  const [registerState, registerDispatch] = useReducer(registerReducer, initialRegisterState);
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState("account");

  const api = "https://vecindapp.up.railway.app";

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "login") {
      loginDispatch({ type: "SET_FIELD", payload: { name, value } });
    } else if (type === "register") {
      registerDispatch({ type: "SET_FIELD", payload: { name, value } });
    }
  };

  const handleLogin = async () => {
    console.log('form: ', loginState)
    try {
      const response = await axios.post(`${api}/auth/login`, loginState, {
        headers: { "Content-Type": "application/json" },
      });
      const token = response.data.access_token;
      if (token) {
        localStorage.setItem("token", token);
        window.location.assign("/register");
      }
    } catch (error) {
      toast.error("Ocurrió un error al iniciar sesión", {
        description: "Vuelva a intentarlo",
        action: { label: "Hecho" },
      });
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post(`${api}/auth/register`, registerState, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Registro exitoso", {
        description: "Ahora puede iniciar sesión",
        action: { label: "Hecho" },
      });
      setTab("account");
    } catch (error) {
      toast.error("Error al registrarse", {
        description: "Vuelva a intentarlo",
        action: { label: "Hecho" },
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginData: loginState,
        registerData: registerState,
        showPassword,
        tab,
        setTab,
        togglePasswordVisibility,
        handleChange,
        handleLogin,
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
