import React, { useState, useEffect } from "react";
import {
  listarPlacaService,
  guardarPlacaService,
  mostrarPlacaService,
  editarPlacaService,
  eliminarPlacaService,
} from "../../services/PlacaService";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
const PlacaPage = () => {
  const initValues = {
    user: "",
    placa: "",
    oficina: "",
    tipovehiculo: "",
    km: 0,
    tipocombustible: "",
    marca: "",
    descripcion: "",
    estado: true,
  };
  const [loading, setLoading] = useState(true);
  const [datos, setDatos] = useState(initValues);
  const [listaPlaca, setListaPlaca] = useState([]);
  const [tituloModal, setTituloModal] = useState("Nueva Placa");
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setDatos(initValues);
    setShowModal(false);
    setTituloModal("Nueva Placa");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nDatos = { ...datos, [name]: value };
    setDatos(nDatos);
  };
  const listarPlacas = async () => {
    const result = await listarPlacaService();
    setListaPlaca(result.data);
    setLoading(false);
  };

  const handleShowData = async (id) => {
    setTituloModal("Editar placa");
    const result = await mostrarPlacaService(id);
    setDatos(result.data);
    handleShowModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (datos._id) {
      setTituloModal("Editando la placa");
      await editarPlacaService(datos);
    } else {
      try {
        setTituloModal("Nuevo Placa");
        await guardarPlacaService(datos);
        listarPlacas();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Se acaba de registrar un nuevo usuario",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire("Error", error.response.data, "error");
        console.log("Error Placa: ", error);
      }
    }
    listarPlacas();
    handleCloseModal();
  };
  const handleDelete = async (id, placa) => {
    Swal.fire({
      title: `¿Estás seguro de eliminar la placa ${placa} ?`,
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
        await eliminarPlacaService(id);
        listarPlacas();
      }
    });
  };
  useEffect(() => {
    listarPlacas();
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
                  <table className="table table-bordered ">
                    <thead>
                      <tr className="text-center">
                        <th>#</th>
                        <th>Placa</th>
                        <th>Oficina</th>
                        <th>Tipo Vehiculo</th>
                        <th>KM</th>
                        <th>Tipo Combustible</th>
                        <th>Marca</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {listaPlaca.map((placa, index) => (
                        <tr key={placa._id}>
                          <td> {index + 1} </td>
                          <td> {placa.placa} </td>
                          <td>{placa.oficina}</td>
                          <td>{placa.tipovehiculo}</td>
                          <td>{placa.km}</td>
                          <td>{placa.tipocombustible}</td>
                          <td>{placa.marca}</td>
                          <td>{placa.descripcion}</td>
                          <td>
                            <Button
                              onClick={() => handleShowData(placa._id)}
                              className="btn btn-warning"
                              size="sm"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </Button>
                            &nbsp;
                            <Button
                              className="btn btn-danger"
                              size="sm"
                              onClick={() =>
                                handleDelete(placa._id, placa.placa)
                              }
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
                    name="placa"
                    type="text"
                    className="form-control"
                    placeholder="Placa"
                    value={datos.placa}
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
                    required
                    value={datos.oficina}
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
                    <i className="bi bi-building"></i>
                  </span>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="tipovehiculo"
                    onChange={handleChange}
                    required
                    value={datos.tipovehiculo}
                  >
                    <option value="">Seleccione su tipo de vehiculo</option>

                    <option value="Camioneta">Camioneta</option>
                    <option value="Motocicleta">Motocicleta</option>
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>
                  <input
                    required
                    type="number"
                    name="km"
                    className="form-control"
                    placeholder="Kilometraje"
                    value={datos.km}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-people"></i>
                  </span>
                  <select
                    name="tipocombustible"
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleChange}
                    required
                    value={datos.tipocombustible}
                  >
                    <option value="">Tipo de combustible</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Gasolina">Gasolina</option>
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-people"></i>
                  </span>
                  <select
                    name="marca"
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleChange}
                    required
                    value={datos.marca}
                  >
                    <option value="">Marca del vehiculo</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Nissan">Nissan</option>
                  </select>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>
                  <textarea
                    name="descripcion"
                    required
                    value={datos.descripcion}
                    placeholder="Descripción"
                    className="form-control"
                    onChange={handleChange}
                  ></textarea>
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

export default PlacaPage;
