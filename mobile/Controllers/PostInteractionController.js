const Express = require('express');
const router = Express.Router();

const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware);

const Instituicao = require('../models/Instituicao');
const Publicacao = require('../models/Publicacao');
const Like = require('../models/Like');
const { Op } = require("sequelize");

router.post('/like', async(req, res)=>{
    const ver = Like.findOne({
        where:{
            id_ong : req.body.id_inst,
            id_usuario : req.body.id_usuario
        }
    })
    if(ver != null)
        res.status(400).json({error:'Você já deu like!'});

    Like.create({
        id_ong : req.body.id_inst,
        id_usuario : req.body.id_usuario
    });
});

router.get('/ver_like/:id_inst/:id_usuario', async(req, res)=>{
    const ver = await Like.findOne({
        where: {
            id_ong : req.params.id_inst,
            id_usuario : req.params.id_usuario
        }
    });
    if(ver != null){
        console.log('true')
        res.json({ver : true});
    }
    else{
        res.json({ver : false});
    }
});

module.exports = app=>app.use('/postinteraction', router)