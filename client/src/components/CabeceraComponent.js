import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AppContext } from "../context/AppContext";

function CabeceraComponent() {
  const { nombre, logout, rol } = useContext(AppContext);

  const navigate = useNavigate();
  const handleLogut = () => {
    logout();
    navigate("/");
  };
  return (
    nombre && (
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Link className="navbar-brand" to="/principal">
            <h4>HAKU</h4>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {" "}
              {rol === "C" && (
                <>
                  <NavLink className="nav-link" to="/principal">
                    Inicio
                  </NavLink>
                  <NavLink className="nav-link" to="/bitacora">
                    Bitácora
                  </NavLink>
                  <NavLink className="nav-link" to="/combustible">
                    Combustible
                  </NavLink>
                  <NavLink className="nav-link" to="/mantenimiento">
                    Mantenimiento
                  </NavLink>{" "}
                </>
              )}
              {rol === "A" && (
                <>
                  <NavLink className="nav-link" to="/admin/placa">
                    Placa
                  </NavLink>
                  <NavLink className="nav-link" to="/admin/usuario">
                    Usuario
                  </NavLink>
                </>
              )}
            </Nav>
            <NavDropdown
              title={nombre}
              id="navbarScrollingDropdown"
              align="end"
            >
              {rol === "A" && (
                <>
                  <p className="text-center">Administrador</p>{" "}
                </>
              )}
              {rol === "C" && (
                <>
                  <p className="text-center">Conductor/ar</p>
                </>
              )}
              <NavDropdown.Divider />

              <NavDropdown.Item href="/cuenta">Cuenta</NavDropdown.Item>
              <NavDropdown.Item href="#">Configuración</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogut}>Salir</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  );
}

export default CabeceraComponent;
