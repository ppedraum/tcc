const Express = require('express');
const router = Express.Router();

const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware);

const Publicacao = require('../models/Publicacao');
const Evento = require('../models/Evento');
const Instituicao = require('../models/Instituicao');
const { Op } = require("sequelize");
const Foto_Publicacao = require('../models/Foto_Publicacao');

router.get('/publicacoes', async (req, res)=>{
    let publiFinais = [];
    let publicacoes = await Publicacao.findAll({
        order:[
            ['datetime_publicacao', 'DESC']
        ]
    });

    for(let i = 0; i < publicacoes.length; i++){
        let foto = await Foto_Publicacao.findOne({
            where:{
                id_publicacao : publicacoes[i].id,
            }
        });

        let inst = await Instituicao.findOne({
            where:{
                id: publicacoes[i].id_ong
            }
        });

        let str_arr = publicacoes[i].descricao.split('');
        let preview_text = '';

        for(let i = 0; i < 80; i++){
            preview_text += str_arr[i];
        }
        preview_text += '...';
        
        publiFinais.push(
            {
                publicacao:publicacoes[i], 
                foto_publicacao:foto, 
                nome_instituicao:inst.nome_fantasia,
                preview_text: preview_text
            }
        );
    }
    /* console.log('----------------------publiFinais-----------------------');
    console.log(publiFinais);
    console.log('--------------------------------------------------------'); */
    res.json(publiFinais);
});

/*

Quando há 2 gets diferentes com a mesma rota (i.e. /publicacoes) o sequelize não
reconhece o que é uma coisa ou outra, mandando para a primeira função que encontrar
*/


router.get('/publicacoes/:titulo', async (req, res)=>{
    let publiFinais = [];
    let publicacoes = await Publicacao.findAll({
        where:{titulo:{
            [Op.substring]:req.params.titulo
        }},
        order:[
            ['datetime_publicacao', 'DESC']
        ]
    });

    for(let i = 0; i < publicacoes.length; i++){
        let foto = await Foto_Publicacao.findOne({
            where:{
                id_publicacao : publicacoes[i].id,
            }
        });

        let inst = await Instituicao.findOne({
            where:{
                id: publicacoes[i].id_ong
            }
        });

        let str_arr = publicacoes[i].descricao.split('');
        let preview_text = '';

        for(let i = 0; i < 80; i++){
            preview_text += str_arr[i];
        }
        preview_text += '...';
        
        publiFinais.push(
            {
                publicacao:publicacoes[i], 
                foto_publicacao:foto, 
                nome_instituicao:inst.nome_fantasia,
                preview_text: preview_text
            }
        );
    }
    res.json(publiFinais);
});

router.get('/galeria/:id_ong', async (req, res)=>{
    let publiFinais = [];
    let publicacoes = await Publicacao.findAll({
        where:{
            id_ong:req.params.id_ong
        },
        order:[
            ['datetime_publicacao', 'DESC']
        ]
    });

    for(let i = 0; i < publicacoes.length; i++){
        let foto = await Foto_Publicacao.findOne({
            where:{
                id_publicacao : publicacoes[i].id,
            }
        });

        let inst = await Instituicao.findOne({
            where:{
                id: publicacoes[i].id_ong
            }
        });

        let str_arr = publicacoes[i].descricao.split('');
        let preview_text = '';

        for(let i = 0; i < 80; i++){
            preview_text += str_arr[i];
        }
        preview_text += '...';
        
        publiFinais.push(
            {
                publicacao:publicacoes[i], 
                foto_publicacao:foto, 
                nome_instituicao:inst.nome_fantasia,
                preview_text: preview_text
            }
        );
    }
    res.json(publiFinais);
});

//sendo assim, essa rota tem que ser /publicacao e não /publicacoes

router.get('/publicacao/:id', async (req, res)=>{
    let publicacao = await Publicacao.findOne({
        where:{
            id: req.params.id
        }
    });

    let foto = await Foto_Publicacao.findOne({
        where:{
            id_publicacao : req.params.id,
        }
    });
    
    /* 
    console.log('--------------------------------------------------------------------------------------');
    console.log(foto);
    console.log('--------------------------------------------------------------------------------------');
    */
    res.json({publicacao: publicacao, foto_publicacao : foto});
});

router.get('/evento/:id', async(req, res)=>{
    
    let evento = await Evento.findOne({
        where:{
            id : req.params.id
        }
    })

    if(evento != null)
        res.status(200).json(evento);
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

router.get('/instituicoes', async (req, res)=>{
    let instituicoes = await Instituicao.findAll();
    res.json(instituicoes);
});

router.get('/instituicoes/:nome', async (req, res)=>{
    let instituicao = await Instituicao.findAll({
        where:{
            nome_fantasia:{[Op.substring]:req.params.nome}
            /* [Op.or]:[
            {
            nome:{[Op.substring]:req.params.nome},
            nome_fantasia:{[Op.substring]:req.params.nome}
            },
            ] */
        }
    },
    );
    res.json(instituicao);
});

router.get('/instituicao/:id', async (req, res)=>{
    let instituicao = await Instituicao.findOne({
        where:{
            id : req.params.id
        }
    },
    );
    res.json(instituicao);
});

module.exports = app => app.use('/projeto', router);