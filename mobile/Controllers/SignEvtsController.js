const Express = require('express');
const router = Express.Router();
const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware);

const { Op } = require("sequelize");
const Inscricao = require('../models/Inscricao');

router.post('/evento', async(req, res)=>{
    const ver = Inscricao.findOne({
        where:{
            id_usuario : req.body.id
        }
    })

    if (ver != null){
        
        res.status(400).send(JSON.stringify({'error': 'Você ja se inscreveu!'}));
    }
    Inscricao.create({
        id_usuario : req.body.id_usuario,
        id_publicacao : req.body.id_publicacao
    })
    
    console.log('ok')
})



module.exports = app => app.use('/inscricoes', router);