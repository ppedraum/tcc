const Express = require('express');
const router = Express.Router();

const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware);

const Inscricao = require('../models/Inscricao');
const Instituicao = require('../models/Instituicao');
const Evento = require('../models/Evento');
const { Op } = require("sequelize");

router.get('/inscricoes', async(req, res)=>{
    res.json('Profile');
})

module.exports = app => app.use('/perfil', router);