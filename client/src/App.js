import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import AuthGuard from "./helper/AuthGuard";
import LoginPage from "./pages/LoginPage";
import CabeceraComponent from "./components/CabeceraComponent";
import BitacoraPage from "./pages/Conductor/BitacoraPage";
import CombustiblePage from "./pages/Conductor/CombustiblePage";
import MantenimientoPage from "./pages/Conductor/MantenimientoPage";
import MyCount from "./pages/MyCount";
import Usuarios from "./pages/Administrador/Usuarios";
import PlacaPage from "./pages/Administrador/PlacaPage";
import PrincipalPage from "./pages/Conductor/PrincipalPage";
function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <CabeceraComponent />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/principal"
            element={<AuthGuard component={PrincipalPage} />}
          />
          <Route
            path="/bitacora"
            element={<AuthGuard component={BitacoraPage} />}
          />
          <Route
            path="/combustible"
            element={<AuthGuard component={CombustiblePage} />}
          />
          <Route
            path="/mantenimiento"
            element={<AuthGuard component={MantenimientoPage} />}
          />
          <Route path="/cuenta" element={<AuthGuard component={MyCount} />} />
          <Route
            path="/admin/placa"
            element={<AuthGuard component={PlacaPage} />}
          />
          <Route
            path="/admin/usuario"
            element={<AuthGuard component={Usuarios} />}
          />
          <Route
            path="*"
            element={
              <h4 className="mt-3 text-center">
                Error 404 - Pagina no encontrada
              </h4>
            }
          />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
