// ⚙️ CONFIGURA QUI l’URL del tuo Laravel (domain o subdomain)
export const LARAVEL_BASE_URL = "https://albo-fornitori.duckdns.org"; 

export const ENDPOINTS = {
  login: "/m/login",
  logout: "/m/logout",
  qrcodeScan: (codice) => `/qrcode/${codice}`,
  nota: (codice) => `/qrcode/${codice}/nota`,
  disassegna: (codice) => `/qrcode/${codice}/disassegna`,
  associa: (codice) => `/qrcode/${codice}/associa`,
  assegna: (articolo) => `/qrcode/assegna/${articolo}`,
  salvaAssegnazione: (articolo) => `/qrcode/assegna/${articolo}`,
  salvaGps: (codice) => `/qrcode/${codice}/gps`,
  salvaPosizione: "/qr/posizione", // route pubblica
};