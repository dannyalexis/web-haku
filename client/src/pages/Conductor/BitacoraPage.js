import { useState, useEffect } from "react";
import { listarPlacaOficinaUsuarioService } from "../../services/PlacaService";
import {
  guardarBitacoraService,
  listarBitacoraUserService,
  peticionBitacoraPlacaUserService,
  eliminarBitacoraService,
  editarBitacoraService,
  mostrarBitacoraService,
} from "../../services/BitacoraService";
import Swal from "sweetalert2";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
const initValues = {
  placa: "",
  kmInicial: 0,
  kmFinal: "",
  LugarOrigen: "",
  LugarLlegada: "",
  fecha: new Date(),
  horaOrigen: "",
  horaLlegada: "",
  proyecto: "",
  pasajeros: "",
  proposito: "",
};

const BitacoraPage = () => {
  const [loading, setLoading] = useState(true);
  const [datos, setDatos] = useState(initValues);
  const [listaPlaca, setListaPlaca] = useState([]);
  const [listarBitacora, setListarBitacoraUser] = useState([]);
  const [tituloModal, setTituloModal] = useState("Registrar Bitacora");
  const [showModal, setShowModal] = useState(false);
  const [km, setKm] = useState();

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setDatos(initValues);
    setShowModal(false);

    setTituloModal("Registrar Bitacora");
    setKm(0);
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;
    const nDatos = { ...datos, [name]: value };

    if (name === "placa") {
      if (value !== "") {
        const result = await peticionBitacoraPlacaUserService(nDatos.placa);
        console.log(result.data);
        const kmi = result.data.kilometraje;
        nDatos.kmInicial = kmi;
        setKm(kmi);
      } else {
        setKm(0);
      }
    }
    setDatos(nDatos);
  };
  const handleShowData = async (id) => {
    setTituloModal("Editar Bitacora");
    const result = await mostrarBitacoraService(id);

    setDatos(result.data);

    handleShowModal();
  };
  const listarPlacas = async (e) => {
    const result = await listarPlacaOficinaUsuarioService();
    setListaPlaca(result.data);
  };
  const listarUserBitacoraUser = async () => {
    const result = await listarBitacoraUserService();
    setListarBitacoraUser(result.data);
    setLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (datos._id) {
        setTituloModal("Editar Mantenimiento");
        await editarBitacoraService(datos);
      } else {
        e.preventDefault();
        if (datos.kmInicial > datos.kmFinal) {
          console.log("El KM inicial no puede mayor al km final");
        }
        await guardarBitacoraService(datos);
        listarUserBitacoraUser();
        handleCloseModal();
        setKm(0);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Se acaba de registrar una bitacora",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire("Error", error.response.data, "error");

      setKm(0);
    }
    handleCloseModal();
    listarUserBitacoraUser();
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: `¿Estás seguro de eliminar la Bitacora ?`,
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
          title: "Bitacora eliminado",
          showConfirmButton: false,
          timer: 1500,
        });
        await eliminarBitacoraService(id);
        listarUserBitacoraUser();
      }
    });
  };

  useEffect(() => {
    listarUserBitacoraUser();
    listarPlacas();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Bitacora">
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
                        <th> Placa vehiculo</th>
                        <th>Fecha</th>
                        <th>Lugar Origen</th>
                        <th>Lugar Llegada</th>
                        <th>H. Origen</th>
                        <th>H. Llegada</th>
                        <th>KM.I</th>
                        <th>KM.F</th>
                        <th>RECORRIDO</th>
                        <th>Proyecto</th>
                        <th>Pasajeros</th>
                        <th>Proposito</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {listarBitacora.map((bitacora, index) => (
                        <tr key={bitacora._id}>
                          <td> {index + 1} </td>
                          <td>{bitacora.placa}</td>
                          <td>
                            {moment(bitacora.fecha).utc().format("DD/MM/YYYY")}
                          </td>
                          <td>{bitacora.LugarOrigen}</td>
                          <td>{bitacora.LugarLlegada}</td>
                          <td>{bitacora.horaOrigen}</td>
                          <td>{bitacora.horaLlegada}</td>
                          <td>{bitacora.kmInicial}</td>
                          <td>{bitacora.kmFinal}</td>
                          <td>{bitacora.kmRecorrido}</td>
                          <td>{bitacora.proyecto}</td>
                          <td>{bitacora.pasajeros}</td>
                          <td>{bitacora.proposito}</td>
                          <td>
                            <Button
                              onClick={() => handleShowData(bitacora._id)}
                              className="btn btn-warning"
                              size="sm"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </Button>
                            &nbsp;
                            <Button
                              className="btn btn-danger"
                              size="sm"
                              onClick={() => handleDelete(bitacora._id)}
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
                      <i className="bi bi-calendar-check"></i>
                    </span>
                    <input
                      required
                      type="date"
                      name="fecha"
                      format="DD-MM-YYYY"
                      className="form-control"
                      value={moment(datos.fecha).utc().format("YYYY-MM-DD")}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-hourglass-bottom"></i>
                    </span>
                    <input
                      required
                      type="time"
                      name="horaOrigen"
                      className="form-control"
                      value={datos.horaOrigen}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-hourglass-top"></i>
                    </span>
                    <input
                      required
                      type="time"
                      name="horaLlegada"
                      className="form-control"
                      value={datos.horaLlegada}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-speedometer2"></i>
                    </span>
                    <input
                      disabled
                      required
                      type="number"
                      name="kmInicial"
                      className="form-control"
                      placeholder="Kilometraje Inicial"
                      value={datos.kmInicial}
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
                      name="kmFinal"
                      className="form-control"
                      placeholder="Kilometraje Final"
                      value={datos.kmFinal}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-geo"></i>
                    </span>
                    <input
                      required
                      type="text"
                      name="LugarOrigen"
                      className="form-control"
                      placeholder="Punto de Origen"
                      value={datos.LugarOrigen}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-geo-fill"></i>
                    </span>
                    <input
                      required
                      type="text"
                      name="LugarLlegada"
                      className="form-control"
                      placeholder="Punto de Legada"
                      value={datos.LugarLlegada}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-lightbulb"></i>
                    </span>
                    <input
                      required
                      type="text"
                      name="proyecto"
                      className="form-control"
                      placeholder="Proyecto"
                      value={datos.proyecto}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-people-fill"></i>
                    </span>
                    <input
                      required
                      type="text"
                      name="pasajeros"
                      className="form-control"
                      placeholder="Pasajeros"
                      value={datos.pasajeros}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-airplane"></i>
                    </span>
                    <input
                      required
                      type="text"
                      name="proposito"
                      className="form-control"
                      placeholder="Proposito del Viaje"
                      value={datos.proposito}
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
        </>
      )}
    </div>
  );
};

export default BitacoraPage;
