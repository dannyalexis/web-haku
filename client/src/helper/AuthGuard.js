import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function AuthGuard({ component: Component }) {
  const token = localStorage.token;
  const accesoRutas = {
    A: ["/admin/placa", "/admin/usuario", "/cuenta", "/principal"],
    C: ["/principal", "/bitacora", "/combustible", "/mantenimiento", "/cuenta"],
  };

  const validar = () => {
    const decoded = jwt_decode(token);
    const accesos = accesoRutas[decoded.role];

    const ruta = window.location.pathname;

    // indexOf encuentra la posición de la ruta en el arreglo accesos
    const acceso = accesos.indexOf(ruta) > -1 ? true : false;
    return acceso;
  };

  return token ? (
    validar() ? (
      <Component />
    ) : (
      <Navigate to="/principal" />
    )
  ) : (
    <Navigate to="/" />
  );
}

export default AuthGuard;
