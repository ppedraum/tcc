const Express = require('express');
const router = Express.Router();

const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware);

const Usuario = require('../models/Usuario');
const Inscricao = require('../models/Inscricao');
const Instituicao = require('../models/Instituicao');
const OngFollow = require('../models/OngFollow');
const Evento = require('../models/Evento');
const Publicacao = require('../models/Publicacao');
const { Op } = require("sequelize");


router.put('/alterar_dados', async(req, res)=>{
    const dados = req.body.dados;
    const id_usuario = req.body.id_usuario;
    const edicao = await Usuario.update({
        nome : dados.nome,
        e_mail : dados.e_mail,
        senha : dados.senha,
        telefone : dados.telefone,
        data_nasc : dados.data_nasc,
        sexo : dados.sexo,
        profissao : dados.profissao,
        cidade : dados.cidade,
        uf : dados.uf,
        cpf : dados.cpf,
        foto_perfil : dados.foto_perfil,
        is_voluntario : dados.is_voluntario,
    },
    {
        where:{
            id : id_usuario
        }
    }
    );

    console.log(req.body.dados);

    if(edicao)
        res.status(200).json({res:'update feito'});
    else
        res.status(400).json({res:'algo deu errado'});
})

router.get('/follows/:id_usuario', async(req, res)=>{
    const insts = await Instituicao.findAll();
    let follows = [];

    /*
    Tive que colocar num for normal pois quando boto insts.forEach() não consigo acrescentar a
    instituição seguida dentro de follows (a resposta das instituições seguidas)
    */
    for(let i = 0; i<insts.length;i++){
        const follow = await OngFollow.findOne({
            where:{
                id_usuario : req.params.id_usuario,
                id_ong : insts[i].id
            }
        })
        if(follow != null){
            follows.push(insts[i])
            
        }
    }
    //console.log(follows);
    res.json(follows);
    
});

router.get('/inscricoes/:id_usuario', async(req, res)=>{
    const eventos = await Evento.findAll();
    let publiInscritas = [];
    /*
    inscricoes tem id_evento
    publicacao tem id_evento
    achar publicacao que tem id_evento = inscricao com id_usuario
    
    
    */

    for(let i = 0; i < eventos.length; i++){
        const inscricao = await Inscricao.findOne({
            where:{
                id_evento : eventos[i].id,
                id_usuario : req.params.id_usuario
            }
        });

        if(inscricao != null){
            //console.log('id evento', inscricao.id_evento);
            const publicacao = await Publicacao.findOne({
                where:{
                    id_evento : inscricao.id_evento
                }
            });
            if(publicacao != null){
                //console.log('id publicacao', publicacao.id);
                publiInscritas.push(publicacao);
            }
        }
    }
    res.json(publiInscritas);
    
});

router.delete('/inscricao', async(req, res)=>{
    
    let inscricao = await Inscricao.findOne({
        where:{
            id_evento : req.body.id_evento
        }
    })

    if(inscricao != null){
        
        inscricao.destroy();
        res.status(200);
    }
    else
        res.status(400);
});


module.exports = app => app.use('/perfil', router);