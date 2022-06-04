# Simple NODE JS server template

- No Database!
- cookie-parser
- CORS enabled
- dotenv for env fariables
- nodemailer

## Basic Requirements

Create .env file and define variables

```
STATIC_PATH=PATH_TO_YOUR_STATIC_DIRECTORY
IS_HTTPS=true
SSL_KEY_PATH=PATH_TO_SSL_KEY
SSL_CERT_PATH=PATH_TO_SSL_CERTIFICATE
CLIENT_PORT=3000 # if your client is serving on different port
```

STATIC_PATH - directory contains index.html, js, css and media files
IS_HTTPS - if true will run with SSL certificates, you should put pathes to .env (SSL_KEY_PATH and SSL_CERT_PATH)

## Start Setup

```bash
# install dependencies
$ npm install


# start nodemon server
$ npm run dev:server

API endpoint is enabled on http://localhost:9000/api/send-mail
CLIENT is enabled on http://localhost:9000/

If IS_HTTPS=true
API endpoint is enabled on http://localhost:80/api/send-mail
CLIENT is enabled on http://localhost:9000/

# start node server
$ npm run prod:server

```
