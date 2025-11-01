import { LARAVEL_BASE_URL } from './config.js';

const withBase = (path) => `${LARAVEL_BASE_URL}${path}`;

// In Laravel con sessione+Sanctum da dominio diverso:
// 1) chiamare /sanctum/csrf-cookie per settare XSRF cookie
// 2) poi POST/GET con { credentials: 'include' } + X-XSRF-TOKEN

async function ensureCsrf() {
  // Se stai usando Sanctum (consigliato per SPA su dominio diverso)
  await fetch(withBase("/sanctum/csrf-cookie"), {
    method: "GET",
    credentials: "include",
  });
}

export async function apiPost(url, data, { json = true } = {}) {
  await ensureCsrf();
  const headers = { "Accept": "application/json" };
  let body;
  if (json) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(data);
  } else {
    body = new URLSearchParams(data);
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  const res = await fetch(withBase(url), {
    method: "POST",
    credentials: "include",
    headers,
    body,
    redirect: "follow",
  });

  // Alcuni endpoint Laravel restituiscono HTML/redirect: gestiamolo
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Errore API");
    return json;
  }
  // Non JSON → torniamo solo l’oggetto Response
  if (!res.ok) throw new Error("Errore API (non JSON)");
  return res;
}

export async function apiGet(url) {
  const res = await fetch(withBase(url), {
    method: "GET",
    credentials: "include",
    headers: { "Accept": "application/json" },
  });
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Errore API");
    return json;
  }
  if (!res.ok) throw new Error("Errore API (non JSON)");
  return res;
}
