const Express = require('express');
const router = Express.Router();

const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware);

const Inscricao = require('../models/Inscricao');
const Instituicao = require('../models/Instituicao');
const OngFollow = require('../models/OngFollow');
const Evento = require('../models/Evento');
const { Op } = require("sequelize");

/* router.get('/follows/:id_usuario', async(req, res)=>{

    const inscricoes = await Inscricao.findAll({
        where:{
            id_usuario : req.params.id_usuario
        }
    });

    let inst = []

    inscricoes.forEach(insc =>{
        console.log(insc)
    })

    res.send('ok');
    
    
    
}) */

module.exports = app => app.use('/perfil', router);