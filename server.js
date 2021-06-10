const express = require('express')
const app = express()
const path = require('path');

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'src', 'app.js'));
});

app.listen(process.env.PORT || 3000);
