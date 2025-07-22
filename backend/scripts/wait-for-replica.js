const { execSync } = require("child_process");

function waitForReplica(maxRetries = 20, delay = 3000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const output = execSync(
        `mongosh --quiet --eval "JSON.stringify(rs.status())"`,
        { stdio: "pipe" }
      ).toString();

      if (output.includes('"ok":1')) {
        console.log("✅ Replica set activo.");
        return;
      }
    } catch {
      // Ignorar errores de rs.status mientras se inicializa
    }
    console.log(`Replica set no listo. Reintentando en ${delay / 1000}s...`);
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, delay);
  }
  console.warn("⚠️ No se pudo confirmar el estado del replica set, iniciando de todas formas...");
}

waitForReplica();
