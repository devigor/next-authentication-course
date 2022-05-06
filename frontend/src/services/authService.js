import { HttpClient } from "../infra/HttpClient/HttpClient";
import { getToken } from "./tokenService";

export const API = "http://localhost:4000";

export const login = async (username, password) => {
  const request = await HttpClient(`${API}/api/login`, {
    method: "POST",
    body: { username, password },
  });

  if (!request.ok) throw new Error("Usuário ou senha inválidos");
  const data = request.body;

  const { refresh_token } = data.data;

  const response = await HttpClient("/api/refresh", {
    method: "POST",
    body: {
      refresh_token,
    },
  });

  return data;
};

export const getSession = async (context = null) => {
  const token = getToken(context);

  const request = await HttpClient(`${API}/api/session`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },

    refresh: true,
  });

  if (!request.ok) throw new Error("401 - Not Authorized");

  return request.body.data;
};
