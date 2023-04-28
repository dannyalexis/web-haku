import { Api } from "../helper/Api";

const PREFIX_URL = "/placa";

export const listarPlacaService = async () => {
  const response = await Api().get(PREFIX_URL + "/");
  return response;
};
export const guardarPlacaService = async (datos) => {
  const response = await Api().post(PREFIX_URL + "/register", datos);
  return response;
};
export const mostrarPlacaService = async (id) => {
  const response = await Api().get(PREFIX_URL + "/" + id);
  return response;
};
export const editarPlacaService = async (datos) => {
  const response = await Api().put(PREFIX_URL + "/" + datos._id, datos);
  return response;
};
export const eliminarPlacaService = async (id) => {
  const response = await Api().delete(PREFIX_URL + "/" + id);
  return response;
};

export const listarPlacaOficinaUsuarioService = async () => {
  const response = await Api().get(PREFIX_URL + "/user/oficina");
  return response;
};
