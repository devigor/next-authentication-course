import nookies from "nookies";

import { API } from "../../src/services/authService";
import { HttpClient } from "../../src/infra/HttpClient/HttpClient";

const REFRESH_TOKEN = "@next-course-refresh-token";

const storeRefreshToken = async (req, res) => {
  const ctx = { req, res };
  nookies.set(ctx, REFRESH_TOKEN, req.body.refresh_token, {
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({
    data: {
      message: "Stored with success",
    },
  });
};

const displayCookies = async (req, res) => {
  const ctx = { req, res };
  res.json({
    data: {
      cookies: nookies.get(ctx),
    },
  });
};

const regenarateTokens = async (req, res) => {
  const ctx = { req, res };
  const cookies = nookies.get(ctx);
  const refresh_token = cookies[REFRESH_TOKEN];

  const refreshResponse = await HttpClient(`${API}/api/refresh`, {
    method: "POST",
    body: { refresh_token },
  });

  if (refreshResponse.ok) {
    nookies.set(ctx, REFRESH_TOKEN, refreshResponse.body.data.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      data: refreshResponse.body.data,
    });
  }
  res.status(401).json({
    status: 401,
    message: "Foi não parça",
  });
};

const controllerBy = {
  POST: storeRefreshToken,
  GET: regenarateTokens,
  // GET: displayCookies,
};

export default function handler(req, res) {
  if (controllerBy[req.method]) return controllerBy[req.method](req, res);

  res.status(404).json({
    status: 404,
    message: "Not found",
  });
}
