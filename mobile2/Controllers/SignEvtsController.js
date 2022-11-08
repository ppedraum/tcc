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
        res.status(200).json({ver : true});
    }
    else{
        res.status(200).json({ver : false});
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
        console.log('-----------------------------------------------');
        console.log('-----------------------------------------------');
        console.log('O id do usuário : ' + req.body.id_usuario);
        console.log('O id do evento : ' + req.body.id_evento);
        console.log('-----------------------------------------------');
        console.log('-----------------------------------------------');
        Inscricao.create({
            id_evento : req.body.id_evento,
            id_usuario : req.body.id_usuario
            
        });
        res.status(200);
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
        
        res.status(400);

    }
    else{
        console.log('-----------------------------------------------');
        console.log('-----------------------------------------------');
        console.log('O id do usuário : ' + req.body.id_usuario);
        console.log('O id do evento : ' + req.body.id_evento);
        console.log('-----------------------------------------------');
        console.log('-----------------------------------------------');
        //console.log('ok')
        ver.destroy();
        res.status(200);
    }
    
});

router.get('/ver_follow/:id_inst/:id_usuario', async(req, res)=>{
    const ver = await OngFollow.findOne({
        where: {
            id_ong : req.params.id_inst,
            id_usuario : req.params.id_usuario
        }
    });

    if(ver != null){
        res.status(200).json({ver : true});
    }
    else{
        res.status(200).json({ver : false});
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
        OngFollow.create({
            id_ong : req.body.id_inst,
            id_usuario : req.body.id_usuario
            
        });
        res.status(200).json('sucesso');
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