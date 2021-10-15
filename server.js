require('dotenv').config()

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const app = express();
const get = require('lodash/get');
const nodemailer = require("nodemailer");
const { sendEmail } = require("./mail-sender");

const jsonParser = bodyParser.json();
const PRODUCTION = process.env.NODE_HTTPS;
const STATIC_PATH = process.env.STATIC_PATH;
const LOCAL_PORT = 3000;

const cerfPathes = {
  // cert: PATH_TO_cert,
  // key: PATH_TO_key,
}

const allowedOrigins = [
  'http://localhost:8080',
  'https://localhost:8080',
  // another url
];

app.use(cors({
  origin: function(origin, callback){
    const msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.' + origin;

    if(allowedOrigins.indexOf(origin) === -1){
      // return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  exposedHeaders: [
    'Content-Length',
    'Accept',
    'Accept-Encoding',
    'Accept-Language',
    'Access-Control-Request-Headers',
    'Access-Control-Request-Method',
    'Cache-Control',
    'Connection',
    'Host',
    'Origin',
    'Pragma',
    'Referer',
    'Sec-Fetch-Mode',
    'Sec-Fetch-Site',
    'User-Agent'
  ]
}));

app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

const expressStaticGzip = require('express-static-gzip');

app.use('/', expressStaticGzip(STATIC_PATH, {
  enableBrotli: true,
  customCompressions: [{
    encodingName: 'deflate',
    fileExtension: 'qz',
  }],
  orderPreference: ['br'],
}));
app.use(express.static(STATIC_PATH));
app.use('/public', express.static(__dirname + '/public'));
app.use(cookieParser());

app.get('*', (req, res) => {
  const htmlPath = path.join(STATIC_PATH, 'index.html');
  res.sendFile(htmlPath);
});

app.post('/api/send-mail', jsonParser, async (req, response) => {
  const { message } = req.body;

    try {
      await sendEmail(message);
      return response.status(200).json({ message: 'success' });
    } catch (error) {
      console.log(error)
      return response.status(400).json({ message: error.message });
    }

  return response.status(400).json({ message: 'error' });
});

if (PRODUCTION) {
  const httpServer = http.createServer(app);

  const httpsServer = https.createServer({
    cert: cerfPathes.cert,
    key: cerfPathes.key,
  },app);

  httpServer.listen(80, () => console.log('HTTP started on port https://localhost:80'));
  httpsServer.listen(443, () => console.log('HTTPS started on port http://localhost:443'));
} else {
  const httpServer = http.createServer(app);

  httpServer.listen(LOCAL_PORT, () => console.log(`HTTP started on port http://localhost:${LOCAL_PORT}`));
}