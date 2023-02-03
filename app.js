const express = require('express');
const app = express();

const rotaEmpresa = require('./routes/Empresa');
const rotaLicenca = require('./routes/Licenca');
const bodyParser = require('body-Parser');


const morgan = require('morgan');
const mysql = require('mysql');


app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use((req, res, next)=>{
    req.header('Access-Control-Allow-Origin','*');
    req.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
})

app.use('/Empresa',rotaEmpresa);
app.use('/Licenca',rotaLicenca);

app.get("/",(req, res) => {
    return res.json({titulo: "Como criar Api"});

});
//Quando não encontra rota, entra aqui.
app.use((req, res, next) =>{
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem: error.message
        }
    });

});

module.exports = app;