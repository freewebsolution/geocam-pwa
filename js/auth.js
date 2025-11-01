import { apiPost } from "./api.js";

export async function login(email, password) {
  await apiPost("/m/login", { email, password }, { json: false });
  return true;
}

export async function logout() {
  await apiPost("/m/logout", {}, { json: false });
  return true;
}
