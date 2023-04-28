import { Api } from "../helper/Api";

const PREFIX_URL = "/combustible";

export const listarCombustibleService = async () => {
  const response = await Api().get(PREFIX_URL + "/");
  return response;
};

export const guardarCombustibleService = async (datos) => {
  const response = await Api().post(PREFIX_URL + "/register", datos);
  return response;
};
export const mostrarCombustibleService = async (id) => {
  const response = await Api().get(PREFIX_URL + "/" + id);
  return response;
};
export const editarCombustibleService = async (datos) => {
  const response = await Api().put(PREFIX_URL + "/" + datos._id, datos);
  return response;
};
export const eliminarCombustibleService = async (id) => {
  const response = await Api().delete(PREFIX_URL + "/" + id);
  return response;
};
export const listarCombustibleUserService = async () => {
  const response = await Api().get(PREFIX_URL + "/user/combustible");
  return response;
};
