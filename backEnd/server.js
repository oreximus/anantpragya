require("rootpath")(); //Little helper to make node.js require relative to your project root
const express = require("express");
const processImage = require("express-processimage");
const fs = require("fs");
const http = require("http");
const https = require("https");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const dotenv = require("dotenv");
const errorHandler = require("_middleware/error-handler");
const ipHandler = require("_middleware/ipHandler");
const allowlist = require("./_config/allow_domain.json");
const routes = require("./routes");

// APP config
dotenv.config();
process.env.TZ = "Asia/Bangkok";

//Define hostname
const hostname =
  process.env.NODE_ENV === "production" ? "127.0.0.1" : "localhost";

// Defining the Express app
const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// adding Helmet to enhance your API's security
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);
app.use(ipHandler);

// using bodyParser to parse JSON bodies into JS objects && application/xwww
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// for parsing multipart / form-data
app.use(processImage());
app.use(express.static(path.join(__dirname, "public")));
app.get("/reset-password", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "reset-password.html"));
});
app.use("/uploads", express.static("uploads"));

// enabling CORS for all requests
app.use(
  cors({
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Global error handler
app.use(errorHandler);

// Registering routes
app.use(routes);

// Start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 8080 : 3002;
const httpServer = process.env.NODE_ENV === "production" ? http : http;
// Create a NodeJS HTTPS listener on port 9006 that points to the Express app
// Use a callback function to tell when the server is created.
const server = httpServer.createServer(app);

server.listen(port, () => {
  console.log(
    `%s server is running at %s://%s:%s`,
    process.env.NODE_ENV,
    process.env.NODE_ENV === "production" ? "https" : "http",
    hostname,
    port,
  );
});
