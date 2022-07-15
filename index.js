require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');

const { db } = require("./db");
const app = express();
const AppRouter = require('./routes/routes.config');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json({ limit: '8mb' }));
app.use(bodyParser.urlencoded({ limit: '8mb', extended: true }));

// AppRouter.routesConfig(app);
app.use('/v1/api', AppRouter);

const port = process.env.PORT;

app.listen(port, function () {
    console.log('app listening at port %s', port);
});
