const Express = require('express');
const router = Express.Router();

const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware);

const Inscricao = require('../models/Inscricao');
const Instituicao = require('../models/Instituicao');
const OngFollow = require('../models/OngFollow');
const Evento = require('../models/Evento');
const Publicacao = require('../models/Publicacao');
const { Op } = require("sequelize");

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


module.exports = app => app.use('/perfil', router);