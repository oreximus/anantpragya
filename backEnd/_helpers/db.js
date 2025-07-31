/**
 * Database config file
 */
const path = require("path");
const config = require("_config/config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
const logger = require("./logger");
const models = require("../models");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Function to resolve config values with environment variables
function resolveConfigValue(value) {
  if (
    typeof value === "string" &&
    value.startsWith("${") &&
    value.endsWith("}")
  ) {
    const envKey = value.slice(2, -1);
    return process.env[envKey] || config.database[envKey];
  }
  return value;
}

// Resolve database configuration
const resolvedDbConfig = Object.keys(config.database).reduce((acc, key) => {
  acc[key] = resolveConfigValue(config.database[key]);
  return acc;
}, {});

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exists
  const { host, port, user, password, database, timezone, ssl } =
    resolvedDbConfig;

  const connectionConfig = {
    host,
    port,
    user,
    password,
    // Add these options to handle self-signed certificates
    // ssl: {
    //     rejectUnauthorized: false, // Warning: This bypasses certificate validation
    //     ...(ssl && ssl.ca ? { ca: ssl.ca } : {}),
    // },
  };

  try {
    const connection = await mysql.createConnection(connectionConfig);

    // Check db connection
    connection.connect(function (err) {
      if (err) {
        console.error("DB Connection Error:", err);
        throw err;
      }
      console.log("DB Connected !!");
    });

    // Check db state
    if (connection.state === "disconnected") {
      return respond(null, { status: "fail", message: "server down" });
    }

    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect: "mysql",
      timezone,
      logging: (msg) =>
        process.env.NODE_ENV === "production"
          ? logger.info(msg)
          : console.log(msg),
      // dialectOptions: {
      //     ssl: {
      //         rejectUnauthorized: false, // Warning: This bypasses certificate validation
      //         ...(ssl && ssl.ca ? { ca: [ssl.ca] } : {}),
      //     },
      // },
    });

    // Testing the connection
    try {
      await sequelize.authenticate();
      process.env.NODE_ENV === "production"
        ? logger.info("Connection has been established successfully.")
        : console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Authentication Error:", error);
      process.env.NODE_ENV === "production"
        ? logger.error(`Unable to connect to the database: ${error}`)
        : console.error(`Unable to connect to the database: ${error}`);
      throw error;
    }

    // init models and add them to the exported db object
    if (models.length > 0) {
      models.forEach((file) => {
        let model = require(path.join(__dirname, "..", "models", file))(
          sequelize,
        );
        db[model.name] = model;
      });
      Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
          db[modelName].associate(db);
        }
      });
    }
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
  } catch (error) {
    console.error("Database Initialization Error:", error);
    throw error;
  }
}
