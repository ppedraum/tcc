const Express = require('express');
const router = Express.Router();
const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware);

const { Op } = require("sequelize");
const Inscricao = require('../models/Inscricao');

router.get('/ver_evento/:id_usuario/:id_evento', async(req, res)=>{
    const ver = await Inscricao.findOne({
        where: {
            id_usuario : req.params.id_usuario,
            id_evento : req.params.id_evento
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

router.post('/evento', async(req, res)=>{
    const ver = await Inscricao.findOne({
        where:{
            id_usuario : req.body.id_usuario,
            id_evento : req.body.id_evento
        }
    });

    if (ver != null){
        res.status(400).send(JSON.stringify({'error': 'Você ja se inscreveu!'}));

    }
    else{
        console.log('ok')
        Inscricao.create({
            id_evento : req.body.id_evento,
            id_usuario : req.body.id_usuario
            
        });
    }
    
});



module.exports = app => app.use('/inscricoes', router);