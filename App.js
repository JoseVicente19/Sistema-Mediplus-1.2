require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { dbConnectMySql } = require("./config/mysql")
const { PATH, ROUTE } = require("./routes")
let path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', express.static('public', {redirect: false}));

const port = process.env.PORT || 3000

//aqui poner cada tabla que modele...
app.use(PATH.usuarios, ROUTE.usuarios);
app.use(PATH.pacientes, ROUTE.pacientes);
app.use(PATH.login, ROUTE.login);
app.use(PATH.cita, ROUTE.cita);
app.use(PATH.authsession, ROUTE.authsession);
app.use(PATH.anpp, ROUTE.anpp);
app.use(PATH.antecedentes, ROUTE.antecedentes);
app.use(PATH.exfisico, ROUTE.exfisico);
app.use(PATH.finconsulta, ROUTE.finconsulta);
app.use(PATH.mhr, ROUTE.mhr);
app.use(PATH.detcita, ROUTE.detcita);

app.get('*', function(req, res, next){
    return res.sendFile(path.resolve('public/index.html'));
});

app.listen(port, () => {
    console.log(`La APi esta lista en el puerto http://localhost:${port}`);

})

dbConnectMySql();
