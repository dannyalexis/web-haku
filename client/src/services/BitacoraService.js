import { Api } from "../helper/Api";

const PREFIX_URL = "/bitacora";

export const guardarBitacoraService = async (datos) => {
  const response = await Api().post(PREFIX_URL + "/register", datos);
  return response;
};

export const listarBitacoraUserService = async () => {
  const response = await Api().get(PREFIX_URL + "/user/bitacora");
  return response;
};

export const mostrarBitacoraService = async (id) => {
  const response = await Api().get(PREFIX_URL + "/" + id);
  return response;
};
export const editarBitacoraService = async (datos) => {
  const response = await Api().put(PREFIX_URL + "/" + datos._id, datos);
  return response;
};
export const peticionBitacoraPlacaUserService = async (placa) => {
  const response = await Api().get(PREFIX_URL + "/user/" + placa);
  return response;
};
export const eliminarBitacoraService = async (id) => {
  const response = await Api().delete(PREFIX_URL + "/" + id);
  return response;
};
