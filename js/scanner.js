import { LARAVEL_BASE_URL } from "./api.js";

export function startScanner(onResult) {
  const video = document.getElementById("camera");
  const detector = "BarcodeDetector" in window ? new BarcodeDetector({ formats: ["qr_code"] }) : null;

  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(stream => {
      video.srcObject = stream;
      video.play();
      scanLoop(video, detector, onResult);
    })
    .catch(() => alert("Impossibile accedere alla fotocamera"));
}

async function scanLoop(video, detector, onResult) {
  if (!detector) return;
  try {
    const results = await detector.detect(video);
    if (results.length > 0) {
      const val = results[0].rawValue.trim();
      video.srcObject.getTracks().forEach(t => t.stop());
      onResult(val);
      return;
    }
  } catch {}
  requestAnimationFrame(() => scanLoop(video, detector, onResult));
}

export function openQrPage(code) {
  let codice = code.includes("://") ? code.split("/").pop() : code;
  location.href = `${LARAVEL_BASE_URL}/qrcode/${encodeURIComponent(codice)}`;
}
