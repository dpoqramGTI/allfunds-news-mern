import path from "path";
import moduleAlias from "module-alias";

const isProd = process.env.NODE_ENV === "production";

// Si está en producción usamos "dist", si no "src"
moduleAlias.addAliases({
  "@": path.resolve(__dirname, isProd ? "." : "./")
});
