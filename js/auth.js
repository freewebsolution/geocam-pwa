import { apiPost } from "./api.js";

// Login al tuo controller MobileAuthController@login
export async function login(email, password) {
  // Il tuo controller accetta form POST /m/login e fa redirect.
  // Usiamo x-www-form-urlencoded per massima compatibilità.
  await apiPost("/m/login", { email, password }, { json: false });
  // Se non ha lanciato errori, la sessione è creata.
  return true;
}

export async function logout() {
  try {
    await apiPost("/m/logout", {}, { json: false }); // crea una route /m/logout se non l’hai
  } catch {}
  return true;
}
