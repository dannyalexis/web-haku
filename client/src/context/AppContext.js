import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AppContext = React.createContext();
const { Provider } = AppContext;

function AppProvider({ children }) {
  const [idUsuario, setIdUsuario] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [rol, setRol] = useState(null);
  const [oficina, setOficina] = useState(null);
  const [email, setEmail] = useState(null);
  const [pais, setPais] = useState(null);
  const [token, setToken] = useState(localStorage.token);

  function login(data) {
    const token = data.token;
    const decoded = jwt_decode(token);
    console.log("decoded => ", decoded);

    setToken(token);
    setIdUsuario(decoded.userId);
    setNombre(decoded.user);
    setRol(decoded.role);
    setOficina(decoded.oficina);
    setEmail(decoded.email);
    setPais(decoded.country);
    localStorage.token = token;
  }
  function logout() {
    setIdUsuario(null);
    setNombre(null);
    setRol(null);
    setEmail(null);
    setOficina(null);
    setPais(null);
    localStorage.removeItem("token");
  }
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setIdUsuario(decoded.userId);
        setNombre(decoded.user);
        setOficina(decoded.oficina);
        setEmail(decoded.email);
        setRol(decoded.role);
        setPais(decoded.country);
      } catch (error) {
        console.log("Token inválido");
      }
    }
  }, []);
  return (
    <Provider
      value={{
        token,
        idUsuario,
        nombre,
        rol,
        oficina,
        email,
        pais,
        login,
        logout,
      }}
    >
      {children}
    </Provider>
  );
}

export { AppProvider, AppContext };
