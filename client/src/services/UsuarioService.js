import axios from "axios";
import { Api } from "../helper/Api";
import { API_URL } from "../helper/Config";

const PREFIX_URL = "/auth";

export const loginUsuarioService = async (datos) => {
  const response = await axios.post(
    API_URL + "/api" + PREFIX_URL + "/login",
    datos
  );
  return response;
};

export const listarUsuarioService = async () => {
  const response = await Api().get(PREFIX_URL + "/");
  return response;
};

export const guardarUsuarioService = async (datos) => {
  const response = await Api().post(PREFIX_URL + "/register", datos);
  return response;
};

export const mostrarUsuarioService = async (id) => {
  const response = await Api().get(PREFIX_URL + "/" + id);
  return response;
};

export const editarUsuarioService = async (datos) => {
  const response = await Api().put(PREFIX_URL + "/" + datos._id, datos);
  return response;
};

export const eliminarUsuarioService = async (id) => {
  const response = await Api().delete(PREFIX_URL + "/" + id);
  return response;
};
