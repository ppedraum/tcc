const Express = require('express');
const router = Express.Router();

const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware);

const Instituicao = require('../models/Instituicao');
const Publicacao = require('../models/Publicacao');
const Like = require('../models/Like');
const { Op } = require("sequelize");


//Nunca esquecer do await!!!!
//Sempre retornar algo com res.json/send/text !!!!
router.post('/like', async(req, res)=>{
    console.log('like')
    const ver = await Like.findOne({
        where:{
            id_publicacao : req.body.id_publicacao,
            id_usuario : req.body.id_usuario
        }
    })
    if(ver != null)
        res.status(400).json('error')
    else{
        Like.create({
            id_publicacao : req.body.id_publicacao,
            id_usuario : req.body.id_usuario
        });
        res.status(200).json('success');
    }
    
});

router.delete('/like', async(req, res)=>{
    console.log('unlike')
    const ver = await Like.findOne({
        where:{
            id_publicacao : req.body.id_publicacao,
            id_usuario : req.body.id_usuario
        }
    });

    if(ver == null)
        res.status(400).json('error');
    else{
        ver.destroy();
        res.status(200).json('success');
    }
    
});

router.get('/ver_like/:id_publicacao/:id_usuario', async(req, res)=>{
    const ver = await Like.findOne({
        where: {
            id_publicacao : req.params.id_publicacao,
            id_usuario : req.params.id_usuario
        }
    });
    if(ver != null){
        res.json({ver : true});
    }
    else{
        res.json({ver : false});
    }
});


router.get('/comentarios', async(req, res)=>{
    cons
})




module.exports = app=>app.use('/postinteraction', router)