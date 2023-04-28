import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import moment from "moment/moment.js";
import { peticionBitacoraPlacaUserService } from "../../services/BitacoraService";
import Spinner from "react-bootstrap/Spinner";

import {
  listarMantenimientoUserService,
  guardarMantenimientoService,
  mostrarMantenimientoService,
  eliminarMantenimientoService,
  editarMantenimientoService,
} from "../../services/MantenimientoService";
import { listarPlacaOficinaUsuarioService } from "../../services/PlacaService";
const initValues = {
  placa: "",
  tipoMantenimiento: "",
  fecha: "",
  km: 0,
  servicioRealizado: "",
  proveedor: "",
  dinero: "",
  observaciones: "",
  nValeFactura: "",
  conformidad: "Si",
};

const MantenimientoPage = () => {
  const [loading, setLoading] = useState(true);
  const [datos, setDatos] = useState(initValues);
  const [listarMantenimientoUser, setListarMantenimientoUser] = useState([]);
  const [listaPlaca, setListaPlaca] = useState([]);
  const [tituloModal, setTituloModal] = useState("Registrar Mantenimiento");
  const [showModal, setShowModal] = useState(false);
  const [km, setKm] = useState([]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setDatos(initValues);
    setShowModal(false);
    setTituloModal("Registrar Mantenimiento");
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;
    const nDatos = { ...datos, [name]: value };
    setDatos(nDatos);
    if (name === "placa") {
      if (value !== "") {
        const result = await peticionBitacoraPlacaUserService(nDatos.placa);
        const kmi = result.data.kilometraje;
        nDatos.km = kmi;
        setKm(kmi);
      } else {
        setKm(0);
      }
    }
    setDatos(nDatos);
  };
  const listarUserMantenimientoUser = async () => {
    const result = await listarMantenimientoUserService();
    setListarMantenimientoUser(result.data);
    setLoading(false);
  };
  const listarPlacas = async (e) => {
    const result = await listarPlacaOficinaUsuarioService();
    setListaPlaca(result.data);
  };
  const handleShowData = async (id) => {
    setTituloModal("Editar Mantenimiento");
    const result = await mostrarMantenimientoService(id);
    setDatos(result.data);
    handleShowModal();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (datos._id) {
      setTituloModal("Editar Mantenimiento");
      await editarMantenimientoService(datos);
    } else {
      e.preventDefault();
      console.log(datos);
      await guardarMantenimientoService(datos);
      listarUserMantenimientoUser();
      handleCloseModal();
      setKm(0);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Se acaba de registrar un nuevo Mantenimiento",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    handleCloseModal();
    listarUserMantenimientoUser();
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: `¿Estás seguro de eliminar el Mantenimiento ?`,
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
          title: "Mantenimiento eliminado",
          showConfirmButton: false,
          timer: 1500,
        });
        await eliminarMantenimientoService(id);
        listarUserMantenimientoUser();
      }
    });
  };

  useEffect(() => {
    listarPlacas();
    listarUserMantenimientoUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="text-center  ">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
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
            <div className="row mt-3 text-center">
              <div className="col-12 col-lg-10 offset-0 offset-lg-1">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="text-center">
                      <tr>
                        <th>#</th>
                        <th>Placa vehiculo</th>
                        <th>Oficina</th>
                        <th>Tipo Mantenimiento</th>
                        <th> Fecha </th>
                        <th>Kilometraje</th>
                        <th>Servicio Realizado</th>
                        <th>Proveedor</th>
                        <th>Costo</th>
                        <th>Conformidad</th>
                        <th>Observaciones</th>
                        <th>Vale/Factura</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {listarMantenimientoUser.map((com, index) => (
                        <tr key={com._id}>
                          <td> {index + 1} </td>
                          <td>{com.placa}</td>
                          <td>{com.oficina}</td>
                          <td>{com.tipoMantenimiento}</td>

                          <td>
                            {moment(com.fecha).utc().format("DD-MM-YYYY")}
                          </td>
                          <td>{com.km}</td>
                          <td>{com.servicioRealizado}</td>
                          <td>{com.proveedor}</td>
                          <td>{com.dinero}</td>
                          <td>{com.conformidad}</td>
                          <td>{com.observaciones}</td>
                          <td>{com.nValeFactura}</td>
                          <td>
                            <Button
                              onClick={() => handleShowData(com._id)}
                              className="btn btn-warning"
                              size="sm"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </Button>
                            &nbsp;
                            <Button
                              className="btn btn-danger"
                              size="sm"
                              onClick={() => handleDelete(com._id)}
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
                      <i className="bi bi-building"></i>
                    </span>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="placa"
                      onChange={handleChange}
                      required
                      value={datos.placa}
                    >
                      <option value="">Seleccione la Placa</option>

                      {listaPlaca.map((placa) => (
                        <option key={placa._id}>{placa.placa}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-people"></i>
                    </span>
                    <select
                      name="tipoMantenimiento"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleChange}
                      required
                      value={datos.tipoMantenimiento}
                    >
                      <option value="">Tipo de Mantenimiento</option>
                      <option value="Diesel">Reparación</option>
                      <option value="Gasolina">Instalación</option>
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-calendar-check"></i>
                    </span>
                    <input
                      required
                      type="date"
                      name="fecha"
                      className="form-control"
                      value={moment(datos.fecha).utc().format("YYYY-MM-DD")}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-speedometer2"></i>
                    </span>
                    <input
                      required
                      type="number"
                      disabled
                      name="km"
                      className="form-control"
                      placeholder="Kilometraje"
                      value={datos.km}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-person-badge-fill"></i>
                    </span>
                    <input
                      required
                      type="text"
                      name="servicioRealizado"
                      className="form-control"
                      placeholder="Servicio Realizado"
                      value={datos.servicioRealizado}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-cash-coin"></i>
                    </span>
                    <input
                      required
                      type="number"
                      name="dinero"
                      className="form-control"
                      placeholder="Precio"
                      value={datos.dinero}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-cart3"></i>
                    </span>
                    <input
                      required
                      type="text"
                      name="proveedor"
                      className="form-control"
                      placeholder="Proveedor"
                      value={datos.proveedor}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-cash-stack"></i>
                    </span>
                    <input
                      required
                      type="text"
                      name="nValeFactura"
                      className="form-control"
                      placeholder="Numero de Vale o Factura"
                      value={datos.nValeFactura}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-lock-fill"></i>
                    </span>
                    <textarea
                      required
                      type="text"
                      name="observaciones"
                      className="form-control"
                      placeholder="Observaciones"
                      value={datos.observaciones}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input
                      required
                      className="form-check-input"
                      type="checkbox"
                      name="conformidad"
                      role="switch"
                      check="Conformidad"
                      value={datos.conformidad}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      Conformidad
                    </label>
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
        </>
      )}
    </div>
  );
};

export default MantenimientoPage;
