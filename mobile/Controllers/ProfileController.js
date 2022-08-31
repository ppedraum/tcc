const Express = require('express');
const router = Express.Router();

const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware);

const Inscricao = require('../models/Inscricao');
const Instituicao = require('../models/Instituicao');
const OngFollow = require('../models/OngFollow');
const Evento = require('../models/Evento');
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
    console.log(follows);
    res.json(follows);
    
});

module.exports = app => app.use('/perfil', router);