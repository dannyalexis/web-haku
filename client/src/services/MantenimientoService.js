import { Api } from "../helper/Api";

const PREFIX_URL = "/mantenimiento";

export const listarMantenimientoService = async () => {
  const response = await Api().get(PREFIX_URL + "/");
  return response;
};
export const guardarMantenimientoService = async (datos) => {
  const response = await Api().post(PREFIX_URL + "/register", datos);
  return response;
};
export const mostrarMantenimientoService = async (id) => {
  const response = await Api().get(PREFIX_URL + "/" + id);
  return response;
};
export const editarMantenimientoService = async (datos) => {
  const response = await Api().put(PREFIX_URL + "/" + datos._id, datos);
  return response;
};
export const eliminarMantenimientoService = async (id) => {
  const response = await Api().delete(PREFIX_URL + "/" + id);
  return response;
};
export const listarMantenimientoUserService = async () => {
  const response = await Api().get(PREFIX_URL + "/user/mantenimiento");
  return response;
};
