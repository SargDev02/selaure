import "server-only";
import { google } from "googleapis";

function getPrivateKey() {
  const key = process.env.GOOGLE_PRIVATE_KEY;

  if (!key) {
    throw new Error("GOOGLE_PRIVATE_KEY no está configurada");
  }

  return key
    .replace(/^["']|["']$/g, "")
    .replace(/\\n/g, "\n")
    .trim();
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: getPrivateKey(),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

export const sheets = google.sheets({
  version: "v4",
  auth,
});