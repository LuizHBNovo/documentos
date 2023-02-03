const express = require('express');
const router = express.Router();

//RETORNA TODOS AS LICENÇAS
router.get('/licencas',(req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        conn.query(
            "SELECT * FROM licenca; ",
            (error, resultado, fields)=>{
                if(error){ return res.status(500).send({error : error})}
                return res.status(200).send({resposne: resultado})
            }
        )
    });
    res.status(200).send({
        mensagem: 'Retorna todas as licencas'
    });
});
//INSERE AS LICENÇAS
router.post('/licenca/insert',(req, res, next)=>{

    mysql.getConnection((error, conn)=>{
        if(error){ return res.status(500).send({error : error})}
        conn.query(
            'INSERT INTO licenca (numero, orgao_ambiental, emissao, validade) VALUES (?, ?, ?, ?)',
            [req.body.numero, req.body.orgao_ambiental, req.body.emissao, req.body.validade],
            (error, resultado, field ) => {
                conn.release();
                if(error){
                    res.status(500).send({
                        error:error,
                        Response:null
                    });
                }    
    res.status(201).send({
        mensagem:'Licença Criada',
        id_licenca: resultado.insertId
                })
            });
        }
    )
});
//ALTERA UM PEDIDO
router.patch('/licenca/update/:id',(req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){ return res.status(500).send({error : error})}
        conn.query(
            'UPDATE licenca SET numero = ?, orgao_ambiental = ?, emissao = ?, validade = ? WHERE id_licenca = ?'
            [req.body.numero, req.body.orgao_ambiental, req.body.emissao, req.body.validade, req.body.id_licenca],
            (error, resultado, field ) => {
                conn.release();
                if(error){
                    res.status(500).send({
                        error:error,
                        Response:null
                    });
                }    
    res.status(202).send({
        mensagem:'Licença atualizada com sucesso',
                })
            });
        }
    )
});
//EXCLUI UM PEDIDO
router.delete('/licenca/delete/:id',(req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){ return res.status(500).send({error : error})}
        conn.query(
            'DELETE FROM licenca WHERE id_licenca = ?'
            [ req.body.id_licenca],
            (error, resultado, field ) => {
                conn.release();
                if(error){
                    res.status(500).send({
                        error:error,
                        Response:null
                    });
                }    
    res.status(202).send({
        mensagem:'Licença removida com sucesso',
                })
            });
        }
    )
});

module.exports = router;
