const https = require('https');
const fs = require('fs');
const path = require('path');

const app = require('express')();

app.get('/', (req, res) => {
    res.send('Hello World');
});

https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', './key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', './cert.pem')),
}, app)
.listen(3000);