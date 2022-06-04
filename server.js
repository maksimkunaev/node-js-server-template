require("dotenv").config();

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const redirectToHTTPS = require("express-http-to-https").redirectToHTTPS;
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const app = express();
const get = require("lodash/get");
const nodemailer = require("nodemailer");
const { sendEmail } = require("./services/mail-sender");
const { webSocket } = require("./services/web-socket-service");

const jsonParser = bodyParser.json();
const SERVER_PORT = process.env.SERVER_PORT || 9000;
const IS_SECURE = process.env.IS_SECURE;

const STATIC_PATH = process.env.STATIC_PATH;
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;
const CLIENT_ORIGIN_LOCAL = `http://localhost:${CLIENT_PORT}`;
const CLIENT_ORIGIN_PROD_SECURE = "https://localhost:443";
const CLIENT_ORIGIN_PROD = "http://localhost:80";

const allowedOrigins = [
  CLIENT_ORIGIN_LOCAL,
  CLIENT_ORIGIN_PROD_SECURE,
  CLIENT_ORIGIN_PROD,
];

app.use(
  cors({
    origin: function (origin, callback) {
      const msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin." +
        origin;

      if (allowedOrigins.indexOf(origin) === -1) {
        // return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    exposedHeaders: [
      "Content-Length",
      "Accept",
      "Accept-Encoding",
      "Accept-Language",
      "Access-Control-Request-Headers",
      "Access-Control-Request-Method",
      "Cache-Control",
      "Connection",
      "Host",
      "Origin",
      "Pragma",
      "Referer",
      "Sec-Fetch-Mode",
      "Sec-Fetch-Site",
      "User-Agent",
    ],
  })
);

app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

const expressStaticGzip = require("express-static-gzip");

app.use(
  "/",
  expressStaticGzip(STATIC_PATH, {
    enableBrotli: true,
    customCompressions: [
      {
        encodingName: "deflate",
        fileExtension: "qz",
      },
    ],
    orderPreference: ["br"],
  })
);
app.use(express.static(STATIC_PATH));
app.use("/public", express.static(__dirname + "/public"));
app.use(cookieParser());

app.get("*", (req, res) => {
  const htmlPath = path.join(STATIC_PATH, "index.html");
  res.sendFile(htmlPath);
});

app.post("/api/send-mail", jsonParser, async (req, response) => {
  const { message } = req.body;

  try {
    await sendEmail(message);
    return response.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    return response.status(400).json({ message: error.message });
  }

  return response.status(400).json({ message: "error" });
});

if (IS_SECURE === "true") {
  const httpServer = http.createServer(app);

  const httpsServer = https.createServer(
    {
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    },
    app
  );

  webSocket(httpServer, CLIENT_ORIGIN_PROD);
  webSocket(httpsServer, CLIENT_ORIGIN_PROD_SECURE);
  httpsServer.listen(80, () => console.log(`HTTP started on port ${80}`));
  httpsServer.listen(443, () => console.log(`HTTPS started on port ${443}`));
} else {
  const httpServer = http.createServer(app);

  webSocket(httpServer, CLIENT_ORIGIN_LOCAL);
  httpServer.listen(SERVER_PORT, () =>
    console.log(`HTTP started on port ${SERVER_PORT}`)
  );
}
