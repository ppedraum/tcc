const Express = require('express');
const router = Express.Router();

const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware);

const Usuario = require('../models/Usuario');
const Comentario = require('../models/Comentario');
const Like = require('../models/Like');
const { Op } = require("sequelize");

router.post('/like', async(req, res)=>{
    //console.log('like')
    const ver = await Like.findOne({
        where:{
            id_publicacao : req.body.id_publicacao,
            id_usuario : req.body.id_usuario
        }
    })
    if(ver != null)
        res.status(400).json('error');
    else{
        Like.create({
            id_publicacao : req.body.id_publicacao,
            id_usuario : req.body.id_usuario
        });
        res.status(200).json('success');
    }
    
});

router.delete('/like', async(req, res)=>{
    //console.log('unlike')
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

    console.log('------------------------------------------');
    console.log('Iniciando rotina de pegar os comentarios');
    console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
    console.log('');


    var commFinais = [];

    const comentarios = await Comentario.findAll({
        where:{
            id_publicacao : req.params.id_publicacao
        }
    });
    for(let i = 0; i<comentarios.length;i++){
        
        const commUser = await Usuario.findOne({
            where:{
                id : comentarios[i].id_usuario
            }
        })
        commFinais.push({estrutura:comentarios[i], nome_usuario:commUser.nome, foto_perfil:commUser.foto_perfil});
    }
    console.log('');
    console.log('Comentarios finais foram pegos');
    console.log('------------------------------------------');
    res.status(200).json(commFinais);

});

router.post('/comentarios', async(req, res)=>{
    
    console.log('------------------------------------------');
    console.log('Iniciando rotina de Postar um comentario');
    console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
    console.log('');

    const comentario = await Comentario.create({
        conteudo : req.body.conteudo,
        id_publicacao : req.body.id_publicacao,
        id_usuario : req.body.id_usuario,
        id_pai : req.body.id_pai,
        datetime_post : new Date()
    })
    
    if(comentario != null){
        res.json(200);
    }
    else{
        res.json(400);
    }
});

router.delete('/comentarios', async(req, res)=>{

    console.log('------------------------------------------');
    console.log('Iniciando rotina de deletar um comentario');
    console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
    console.log('');

    console.log('Id do usuario : ' + req.body.id_usuario);
    console.log('Id do comentario : ' + req.body.id);
    const ver = await Comentario.findOne({
        where:{
            id : req.body.id,
            id_usuario : req.body.id_usuario
        }
    });

    if(ver == null){
        //console.log('a')
        res.status(400).json({err:'user not allowed'});
        console.log('');
        console.log('O usuario nao esta permitido a excluir o comm com este ID');
        console.log('------------------------------------------');
    }
    else{
        //console.log('b')
        const filhos = await Comentario.findAll({
            where:{
                id_pai : req.body.id
            }
        });

        if(filhos.length != 0)
            for(let i = 0; i< filhos.length; i++){
                filhos[i].destroy();
            }

        ver.destroy();
        //console.log('comentario deletado');
        res.status(200).json({msg:'deletion complete'});

        console.log('');
        console.log('Comentario deletado');
        console.log('------------------------------------------');
    }

})



module.exports = app=>app.use('/postinteraction', router)