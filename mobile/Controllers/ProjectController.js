const Express = require('express');
const router = Express.Router();
const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware);

const Publicacao = require('../models/Publicacao');
const { Op } = require("sequelize");

router.get('/publicacoes', async (req, res)=>{
    let publicacoes = await Publicacao.findAll({
        where:{
            tipo_publicacao:{
                [Op.not]:'REQUISICAO'
            }
        },
        order:[
            ['datetime_publicacao', 'DESC']
        ]
    });
    res.json(publicacoes);
});

/*
Quando há 2 gets diferentes com a mesma rota (i.e. /publicacoes) o sequelize não
reconhece o que é uma coisa ou outra, mandando para a primeira função que encontrar
*/

router.get('/publicacoes/:titulo', async (req, res)=>{
    let publicacao = await Publicacao.findAll({
        where:{titulo:{
            [Op.substring]:req.params.titulo
        }},
        order:[
            ['datetime_publicacao', 'DESC']
        ]
    });
    res.json(publicacao);
});

//sendo assim, essa rota tem que ser /publicacao e não /publicacoes

router.get('/publicacao/:id', async (req, res)=>{
    let publicacao = await Publicacao.findOne({
        where:{
            id: req.params.id
        }
    });
    res.json(publicacao);
});

router.get('/voluntariado', async (req, res)=>{
    let publicacoes = await Publicacao.findAll({
        where:{
            tipo_publicacao: 'REQUISICAO'
        },
        order:[
            ['datetime_publicacao', 'DESC']
        ]
    });
    res.json(publicacoes);
});

router.get('/voluntariado/:titulo', async (req, res)=>{
    let publicacao = await Publicacao.findAll({
        where:{
            titulo:{ [Op.substring]:req.params.titulo },
            tipo_publicacao: 'REQUISICAO'
        },
        order:[
            ['datetime_publicacao', 'DESC']
        ]
    });
    res.json(publicacao);
});


module.exports = app => app.use('/projeto', router);