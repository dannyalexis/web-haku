import React, { useState, useEffect } from "react";
import {
  listarUsuarioService,
  guardarUsuarioService,
  eliminarUsuarioService,
  mostrarUsuarioService,
  editarUsuarioService,
} from "../../services/UsuarioService";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Spinner } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const initValues = {
  name: "",
  lastname: "",
  oficina: "",
  email: "",
  password: "",
  phone: "",
  tipo: "",
  img: null,
  country: "",
};

const Usuarios = () => {
  const [loading, setLoading] = useState(true);
  const [datos, setDatos] = useState(initValues);
  const [listaUsers, setListaUsers] = useState([]);
  const [tituloModal, setTituloModal] = useState("Nuevo Usuario");
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setDatos(initValues);
    setShowModal(false);
    setTituloModal("Nuevo Pedido");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nDatos = { ...datos, [name]: value };
    setDatos(nDatos);
    console.log(nDatos);
  };
  const listarUsers = async () => {
    const result = await listarUsuarioService();
    setListaUsers(result.data);
    setLoading(false);
  };
  const handleShowData = async (id) => {
    setTituloModal("Editar usuario");
    const result = await mostrarUsuarioService(id);
    setDatos(result.data);
    handleShowModal();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(datos._id);
    if (datos._id) {
      setTituloModal("Editando el usuario");
      await editarUsuarioService(datos);
    } else {
      try {
        setTituloModal("Nuevo Usuario");
        await guardarUsuarioService(datos);
        listarUsers();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Se acaba de registrar un nuevo usuario",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire("Error", error.response.data, "error");
        console.log("Error Email: ", error);
      }
    }
    listarUsers();
    handleCloseModal();
  };
  const handleDelete = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Estás seguro de eliminar?",
      text: "Recuerda que una vez eliminado no se va poder recuperar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, deseo eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Usuario eliminado",
          showConfirmButton: false,
          timer: 1500,
        });
        await eliminarUsuarioService(id);
        listarUsers();
      }
    });
  };
  useEffect(() => {
    listarUsers();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <div>
          <div className="container-fluid">
            <div className="row mt-3">
              <div className="col-md-4 offset-md-4">
                <div className="d-grid mx-auto">
                  <Button className="btn btn-dark" onClick={handleShowModal}>
                    <i className="bi bi-plus-circle"> </i>
                    Agregar
                  </Button>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <div className="table-responsive">
                  <br />

                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Oficina</th>
                        <th>Tipo</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>País</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>

                    <tbody className="table-group-divider">
                      {listaUsers.map((user, index) => (
                        <tr key={user._id}>
                          <td> {index + 1} </td>
                          <td> {user.name} </td>
                          <td>{user.lastname}</td>
                          <td>{user.oficina}</td>
                          <td>{user.tipo}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.country}</td>
                          <td>
                            <Button
                              onClick={() => handleShowData(user._id)}
                              className="btn btn-warning"
                              size="sm"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </Button>
                            &nbsp;
                            <Button
                              className="btn btn-danger"
                              size="sm"
                              onClick={() => handleDelete(user._id)}
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Modal
            show={showModal}
            onHide={handleCloseModal}
            size="lg"
            backdrop="static"
            keyboard={false}
          >
            <form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>{tituloModal}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-tag"></i>
                  </span>
                  <input
                    required
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Nombres"
                    value={datos.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-person-check"></i>
                  </span>
                  <input
                    required
                    type="text"
                    name="lastname"
                    className="form-control"
                    placeholder="Apellidos"
                    value={datos.lastname}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-envelope-plus"></i>
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={datos.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-building"></i>
                  </span>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="oficina"
                    onChange={handleChange}
                    value={datos.oficina}
                    required
                  >
                    <option value="">Seleccione su oficina</option>
                    <option value="CO">CO</option>
                    <option value="PU Lima">PU Lima</option>
                    <option value="PU Piura">PU Piura</option>
                    <option value="PU Loreto">PU Loreto</option>
                    <option value="PU Cusco">PU Cusco</option>
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>
                  <input
                    required
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={datos.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-telephone-plus"></i>
                  </span>
                  <input
                    required
                    type="number"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    value={datos.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-people"></i>
                  </span>
                  <select
                    name="tipo"
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleChange}
                    required
                    value={datos.tipo}
                  >
                    <option value="">Tipo de usuario</option>
                    <option value="A">Administrador</option>
                    <option value="C">Conductor/ar</option>
                  </select>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-person-bounding-box"></i>
                  </span>
                  <select
                    name="country"
                    onChange={handleChange}
                    className="form-select"
                    aria-label="Default select example"
                    required
                    value={datos.country}
                  >
                    <option required value="">
                      Seleccione su País
                    </option>
                    <option value="Perú">Perú</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Bolivia">Bolivia</option>
                  </select>
                </div>

                <div className="d-grid col-6 mx-auto">
                  <Button className="btn btn-success" type="submit">
                    <i className="bi bi-send-check"></i>
                  </Button>
                </div>
              </Modal.Body>
            </form>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Usuarios;

/*
import React, { useState, useEffect, useRef } from "react";
import {
  listarUsuarioService,
  guardarUsuarioService,
  eliminarUsuarioService,
  mostrarUsuarioService,
  editarUsuarioService,
} from "../../services/UsuarioService";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Spinner } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const initValues = {
  name: "",
  lastname: "",
  oficina: "",
  email: "",
  password: "",
  phone: "",
  tipo: "",
  img: [],
  country: "",
};

const Usuarios = () => {
  const [loading, setLoading] = useState(true);
  const [datos, setDatos] = useState(initValues);
  const [listaUsers, setListaUsers] = useState([]);
  const [tituloModal, setTituloModal] = useState("Nuevo Usuario");
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setDatos(initValues);
    setShowModal(false);
    setTituloModal("Nuevo Pedido");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nDatos = { ...datos, [name]: value };
    nDatos.img = image;
    setDatos(nDatos);
    console.log(nDatos);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    if (reader) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };

  const listarUsers = async () => {
    const result = await listarUsuarioService();
    setListaUsers(result.data);
    setLoading(false);
  };
  const handleShowData = async (id) => {
    setTituloModal("Editar usuario");
    const result = await mostrarUsuarioService(id);
    setDatos(result.data);
    handleShowModal();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (datos._id) {
      setTituloModal("Editando el usuario");
      await editarUsuarioService(datos);
    } else {
      try {
        setTituloModal("Nuevo Usuario");
        console.log(datos);
        //await guardarUsuarioService(datos);
        listarUsers();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Se acaba de registrar un nuevo usuario",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire("Error", error.response.data, "error");
        console.log("Error Email: ", error);
      }
    }
    listarUsers();
    handleCloseModal();
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Estás seguro de eliminar?",
      text: "Recuerda que una vez eliminado no se va poder recuperar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, deseo eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Usuario eliminado",
          showConfirmButton: false,
          timer: 1500,
        });
        await eliminarUsuarioService(id);
        listarUsers();
      }
    });
  };
  useEffect(() => {
    listarUsers();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <div>
          <div className="container-fluid">
            <div className="row mt-3">
              <div className="col-md-4 offset-md-4">
                <div className="d-grid mx-auto">
                  <Button className="btn btn-dark" onClick={handleShowModal}>
                    <i className="bi bi-plus-circle"> </i>
                    Agregar
                  </Button>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <div className="table-responsive">
                  <br />

                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Oficina</th>
                        <th>Tipo</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>País</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>

                    <tbody className="table-group-divider">
                      {listaUsers.map((user, index) => (
                        <tr key={user._id}>
                          <td> {index + 1} </td>
                          <td> {user.name} </td>
                          <td>{user.lastname}</td>
                          <td>{user.oficina}</td>
                          <td>{user.tipo}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.country}</td>
                          <td>
                            <Button
                              onClick={() => handleShowData(user._id)}
                              className="btn btn-warning"
                              size="sm"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </Button>
                            &nbsp;
                            <Button
                              className="btn btn-danger"
                              size="sm"
                              onClick={() => handleDelete(user._id)}
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Modal
            show={showModal}
            onHide={handleCloseModal}
            size="lg"
            backdrop="static"
            keyboard={false}
          >
            <form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>{tituloModal}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-tag"></i>
                  </span>
                  <input
                    required
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Nombres"
                    value={datos.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-person-check"></i>
                  </span>
                  <input
                    required
                    type="text"
                    name="lastname"
                    className="form-control"
                    placeholder="Apellidos"
                    value={datos.lastname}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-envelope-plus"></i>
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={datos.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-building"></i>
                  </span>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="oficina"
                    onChange={handleChange}
                    value={datos.oficina}
                    required
                  >
                    <option value="">Seleccione su oficina</option>
                    <option value="CO">CO</option>
                    <option value="PU Lima">PU Lima</option>
                    <option value="PU Piura">PU Piura</option>
                    <option value="PU Loreto">PU Loreto</option>
                    <option value="PU Cusco">PU Cusco</option>
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>
                  <input
                    required
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={datos.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-telephone-plus"></i>
                  </span>
                  <input
                    required
                    type="number"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    value={datos.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-people"></i>
                  </span>
                  <select
                    name="tipo"
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleChange}
                    required
                    value={datos.tipo}
                  >
                    <option value="">Tipo de usuario</option>
                    <option value="A">Administrador</option>
                    <option value="C">Conductor/ar</option>
                  </select>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-person-bounding-box"></i>
                  </span>
                  <select
                    name="country"
                    onChange={handleChange}
                    className="form-select"
                    aria-label="Default select example"
                    required
                    value={datos.country}
                  >
                    <option required value="">
                      Seleccione su País
                    </option>
                    <option value="Perú">Perú</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Bolivia">Bolivia</option>
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-card-image"></i>
                  </span>
                  <input
                    required
                    type="file"
                    name="img"
                    className="form-control"
                    placeholder="Foto"
                    onChange={handleImage}
                  />
                </div>
                <div>
                  <img src={image} alt="product image" />
                </div>
                <div className="d-grid col-6 mx-auto">
                  <Button className="btn btn-success" type="submit">
                    <i className="bi bi-send-check"></i>
                  </Button>
                </div>
              </Modal.Body>
            </form>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Usuarios;*/
