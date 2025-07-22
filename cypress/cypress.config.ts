import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl || "http://localhost:3000",
    chromeWebSecurity: false,  // Esto ya desactiva sandbox y permite cross-origin
    experimentalModifyObstructiveThirdPartyCode: true, // Hace que la app no se meta en iframe
    viewportWidth: 1280,
    viewportHeight: 800,
    video: false,
    experimentalStudio: true,  // Opcional para grabar acciones
  },
});
