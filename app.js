// Registra il Service Worker per installabilità/offline
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then(() => {
    console.log("✅ Service Worker attivo");
  });
}

// Helpers
const byId = (id) => document.getElementById(id);
const locOut = byId("locOut");
const video = byId("video");
const canvas = byId("canvas");
const btnLoc = byId("btnLoc");
const btnCam = byId("btnCam");
const btnSnap = byId("btnSnap");

// 📍 Geolocalizzazione
btnLoc.addEventListener("click", () => {
  if (!("geolocation" in navigator)) {
    locOut.textContent = "Geolocalizzazione non supportata";
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      locOut.textContent = `Lat ${latitude.toFixed(6)}, Lng ${longitude.toFixed(6)} (±${Math.round(accuracy)}m)`;
    },
    (err) => {
      locOut.textContent = `Errore: ${err.message}`;
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
});

// 📷 Fotocamera + snapshot su canvas
let stream = null;
btnCam.addEventListener("click", async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
    video.srcObject = stream;
    await video.play().catch(() => {}); // iOS può richiedere un gesto utente
    btnSnap.disabled = false;
  } catch (e) {
    alert("Impossibile aprire la fotocamera: " + e.message);
  }
});

btnSnap.addEventListener("click", () => {
  if (!stream) return;
  const w = video.videoWidth || 1280;
  const h = video.videoHeight || 720;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, w, h);
  canvas.style.display = "block";

  // Esempio: esporta immagine come data URL (base64)
  const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
  console.log("Foto (base64):", dataUrl.slice(0, 64) + "...");
});
