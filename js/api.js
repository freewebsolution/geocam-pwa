export const LARAVEL_BASE_URL = "https://albo-fornitori.duckdns.org";

export async function apiPost(path, data = {}, options = { json: true }) {
  const body = options.json
    ? JSON.stringify(data)
    : new URLSearchParams(data).toString();

  const headers = options.json
    ? { "Content-Type": "application/json" }
    : { "Content-Type": "application/x-www-form-urlencoded" };

  const res = await fetch(`${LARAVEL_BASE_URL}${path}`, {
    method: "POST",
    headers,
    body,
    credentials: "include",
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res;
}

export async function apiGet(path) {
  const res = await fetch(`${LARAVEL_BASE_URL}${path}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res;
}
