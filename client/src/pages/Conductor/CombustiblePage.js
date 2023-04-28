import { useState, useEffect } from "react";

import { peticionBitacoraPlacaUserService } from "../../services/BitacoraService";
import { listarPlacaOficinaUsuarioService } from "../../services/PlacaService";
import {
  listarCombustibleUserService,
  guardarCombustibleService,
  eliminarCombustibleService,
  editarCombustibleService,
  mostrarCombustibleService,
} from "../../services/CombustibleService";

import Swal from "sweetalert2";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const initValues = {
  placa: "",
  cantidadGalones: "",
  km: "",
  costo: "",
  fecha: new Date(),
  proveedor: "",
  observaciones: "",
  nValeFactura: "",
  tipoCombustible: "",
};

const CombustiblePage = () => {
  const [loading, setLoading] = useState(true);
  const [datos, setDatos] = useState(initValues);
  const [listarCombustibleUser, setListarCombustibleUser] = useState([]);
  const [listaPlaca, setListaPlaca] = useState([]);
  const [tituloModal, setTituloModal] = useState("Registrar Combustible");
  const [showModal, setShowModal] = useState(false);
  const [km, setKm] = useState([]);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setDatos(initValues);
    setShowModal(false);
    setTituloModal("Registrar Combustible");
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
    console.log(nDatos);
  };

  const listarUserCombustibleUser = async () => {
    const result = await listarCombustibleUserService();
    setListarCombustibleUser(result.data);
    setLoading(false);
  };

  const listarPlacas = async (e) => {
    const result = await listarPlacaOficinaUsuarioService();
    setListaPlaca(result.data);
  };
  const handleShowData = async (id) => {
    setTituloModal("Editar Combustible");
    const result = await mostrarCombustibleService(id);
    setDatos(result.data);
    handleShowModal();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (datos._id) {
      setTituloModal("Editar Combustible");
      await editarCombustibleService(datos);
    } else {
      e.preventDefault();
      await guardarCombustibleService(datos);
      listarUserCombustibleUser();
      handleCloseModal();
      setKm(0);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Se acaba de registrar un nuevo combustible",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    handleCloseModal();
    listarUserCombustibleUser();
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: `¿Estás seguro de eliminar el combustible ?`,
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
          title: "Combustible eliminado",
          showConfirmButton: false,
          timer: 1500,
        });
        await eliminarCombustibleService(id);
        listarUserCombustibleUser();
      }
    });
  };
  useEffect(() => {
    listarPlacas();
    listarUserCombustibleUser();
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
          (
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

                        <th> Placa vehiculo</th>
                        <th>Oficina</th>
                        <th>Tipo Combustible</th>
                        <th>Cantidad Galones</th>
                        <th>Costo</th>
                        <th> Fecha </th>
                        <th>Proveedor</th>
                        <th>Vale/Factura</th>
                        <th>Observaciones</th>
                        <th>Kilometraje</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {listarCombustibleUser.map((com, index) => (
                        <tr key={com._id}>
                          <td> {index + 1} </td>

                          <td>{com.placa}</td>
                          <td>{com.oficina}</td>
                          <td>{com.tipoCombustible}</td>
                          <td>{com.cantidadGalones}</td>
                          <td>{com.costo}</td>
                          <td>
                            {moment(com.fecha).utc().format("DD-MM-YYYY")}
                          </td>
                          <td>{com.proveedor}</td>
                          <td>{com.nValeFactura}</td>
                          <td>{com.observaciones}</td>
                          <td>{com.km}</td>
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
                      <i className="bi bi-fuel-pump"></i>
                    </span>
                    <select
                      name="tipoCombustible"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleChange}
                      required
                      value={datos.tipoCombustible}
                    >
                      <option value="">Tipo de combustible</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Gasolina">Gasolina</option>
                    </select>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-3-circle"></i>
                    </span>
                    <input
                      required
                      type="number"
                      name="cantidadGalones"
                      className="form-control"
                      placeholder="Cantidad de Galones"
                      value={datos.cantidadGalones}
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
                      name="costo"
                      className="form-control"
                      placeholder="Precio"
                      value={datos.costo}
                      onChange={handleChange}
                    />
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
                      <i className="bi bi-person-badge-fill"></i>
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
                      placeholder="Observación"
                      value={datos.observaciones}
                      onChange={handleChange}
                    />
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
          )
        </>
      )}
    </div>
  );
};

export default CombustiblePage;
