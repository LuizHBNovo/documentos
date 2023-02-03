const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
//RETORNA TODAS AS EMPRESAS
router.get('/empresas',(req, res, next)=>{

    mysql.getConnection((error, conn)=>{
        conn.query(
            "SELECT * FROM produtos; ",
            (error, resultado, fields)=>{
                if(error){ return res.status(500).send({error : error})}
                return res.status(200).send({resposne: resultado})
            }
        )
    });
    res.status(200).send({
        mensagem: 'Retorna todas as empresas'
    });
});
//INSERE AS EMPRESAS
router.post('/empresa/salvar',(req, res, next)=>{

    mysql.getConnection((error, conn)=>{
        if(error){ return res.status(500).send({error : error})}
        conn.query(
            'INSERT INTO empresa (razao_social, cnpj, cep, cidade, estado, bairro, complemento) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [req.body.razao_social, req.body.cnpj, req.body.cep, req.body.cidade, req.body.estado, req.body.bairro, req.body.complemento],
            (error, resultado, field ) => {
                conn.release();
                if(error){
                    res.status(500).send({
                        error:error,
                        Response:null
                    });
                }    
    res.status(201).send({
        mensagem:'Empresa Criada',
        id_empresa: resultado.insertId
                })
            });
        }
    )

});
//ALTERA UMA EMPRESA
router.patch('/empresa/update/:id',(req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){ return res.status(500).send({error : error})}
        conn.query(
            'UPDATE empresa SET razao_social = ?, cnpj = ?, cep = ?, cidade = ?, estado = ?, bairro = ?, complemento = ?, WHERE id_empresa = ?'
            [req.body.razao_social, req.body.cnpj, req.body.cep, req.body.cidade, req.body.estado, req.body.bairro, req.body.complemento, req.body.id_empresa],
            (error, resultado, field ) => {
                conn.release();
                if(error){
                    res.status(500).send({
                        error:error,
                        Response:null
                    });
                }    
    res.status(202).send({
        mensagem:'Empresa atualizada com sucesso',
                })
            });
        }
    )
});
//DELETA UMA EMPRESA
router.delete('/empresa/delete/:id',(req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){ return res.status(500).send({error : error})}
        conn.query(
            'DELETE FROM empresa WHERE id_empresa = ?'
            [ req.body.id_empresa],
            (error, resultado, field ) => {
                conn.release();
                if(error){
                    res.status(500).send({
                        error:error,
                        Response:null
                    });
                }    
    res.status(202).send({
        mensagem:'Empresa removida com sucesso',
                })
            });
        }
    )
});

module.exports = router;



