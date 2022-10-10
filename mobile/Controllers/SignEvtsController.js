const Express = require('express');
const router = Express.Router();
const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware);

const { Op } = require("sequelize");
const Inscricao = require('../models/Inscricao');
const OngFollow = require('../models/OngFollow');

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

router.delete('/evento', async(req, res)=>{
    const ver = await Inscricao.findOne({
        where:{
            id_usuario : req.body.id_usuario,
            id_evento : req.body.id_evento
        }
    });

    if (ver == null){
        res.status(400).send(JSON.stringify({'error': 'Você não está inscrito!'}));

    }
    else{
        console.log('ok')
        ver.destroy();
    }
    
});

router.get('/ver_follow/:id_inst/:id_usuario', async(req, res)=>{
    const ver = await OngFollow.findOne({
        where: {
            id_ong : req.params.id_inst,
            id_usuario : req.params.id_usuario
        }
    });
    //console.log(req.params.id_inst);
    //console.log(req.params.id_usuario);
    if(ver != null){
        console.log('true')
        res.json({ver : true});
    }
    else{
        res.json({ver : false});
    }
});

router.post('/inst', async(req, res)=>{
    const ver = await OngFollow.findOne({
        where:{
            id_ong : req.body.id_inst,
            id_usuario : req.body.id_usuario
        }
    });

    if (ver != null){
        res.status(400).send(JSON.stringify({'error': 'Você ja se inscreveu!'}));

    }
    else{
        console.log('ok')
        OngFollow.create({
            id_ong : req.body.id_inst,
            id_usuario : req.body.id_usuario
            
        });
    }
    
});

router.delete('/inst', async(req, res)=>{
    const ver = await OngFollow.findOne({
        where:{
            id_ong : req.body.id_inst,
            id_usuario : req.body.id_usuario
        }
    });

    if (ver == null){
        res.status(400);

    }
    else{
        ver.destroy();
        res.status(200);
    }
    
});


module.exports = app => app.use('/inscricoes', router);