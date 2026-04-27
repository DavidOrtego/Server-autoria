const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

let config = {};
let swaggerConfig = {};

try {
  const swaggerPath = path.join(__dirname, "../../docs/api/openapi.yaml");
  swaggerDocument = yaml.load(fs.readFileSync(swaggerPath, "utf8"));

  if (!swaggerDocument) {
    throw new Error(
      "El archivo openapi.yaml está vacío o no se ha guardado correctamente.",
    );
  }

  if (process.env.NODE_ENV === "production") {
    config = {
      service: { port: process.env.PORT },
      db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
    };
  } else {
    let configFile = "config.local.yaml";

    if (process.env.NODE_ENV !== "test") {
      const yargs = require("yargs/yargs");
      const { hideBin } = require("yargs/helpers");
      const argv = yargs(hideBin(process.argv)).argv;

      if (argv.config !== undefined) {
        configFile = argv.config;
      }
    }

    const absoluteConfigPath = path.resolve(process.cwd(), configFile);
    config = yaml.load(fs.readFileSync(absoluteConfigPath, "utf-8"));
  }
} catch (error) {
  console.error("\n❌ ERROR CRÍTICO AL ARRANCAR EL SERVIDOR ❌");
  console.error("Fallo en el sistema de configuración.");
  console.error(`Detalle del error: ${error.message}\n`);
  process.exit(1);
}

module.exports = {
  config,
  swaggerDocument,
};
