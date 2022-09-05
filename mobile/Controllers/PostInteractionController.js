const Express = require('express');
const router = Express.Router();

const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware);

const Usuario = require('../models/Usuario');
const Comentario = require('../models/Comentario');
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


router.get('/comentarios/:id_publicacao', async(req, res)=>{

    var commFinais = []

    const comentarios = await Comentario.findAll({
        where:{
            id_publicacao : req.params.id_publicacao
        }
    });
    for(let i = 0; i<comentarios.length;i++){
        
        const commUser = await Usuario.findAll({
            where:{
                id : comentarios[i].id_usuario
            }
        })
        const commFinal = structuredClone(comentarios[i]);
        commFinal['nome_usuario'] = commUser.nome;
        commFinal['foto_perfil'] = commUser.foto_perfil;
        commFinais.push(commFinal);
    }
    console.log(commFinais);
    res.json(comentarios);


})




module.exports = app=>app.use('/postinteraction', router)