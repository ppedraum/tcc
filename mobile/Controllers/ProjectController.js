const Express = require('express');
const router = Express.Router();
const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware);

const Publicacao = require('../models/Publicacao');
const { Op } = require("sequelize");


router.get('/publicacoes', async (req, res)=>{
    let publicacoes = await Publicacao.findAll({
        order:[
            ['datetime_publicacao', 'DESC']
        ]
    });
    res.json(publicacoes);
});

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

module.exports = app => app.use('/projeto', router);