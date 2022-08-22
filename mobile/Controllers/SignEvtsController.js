const Express = require('express');
const router = Express.Router();
const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware);

const { Op } = require("sequelize");
const Inscricao = require('../models/Inscricao');

router.post('/evento', async(req, res)=>{
    const ver = Inscricao.findOne({
        where:{
            id_usuario : req.body.id_usuario
        }
    })

    if (ver != null)
        res.status(400).send(JSON.stringify({'error': 'Você ja se inscreveu!'}));
    else
        Inscricao.create({
            id_evento : req.body.id_evento,
            id_usuario : req.body.id_usuario
            
        });
    
    console.log('ok')
});



module.exports = app => app.use('/inscricoes', router);