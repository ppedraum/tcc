const Express = require('express');
const router = Express.Router();

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

/*
O JWT (json web token) é uma forma de autenticação baseada em tokens, que são mandadas a cada requisição
dentro do app, mantendo assim a certeza de que o usuário está devidamente logado. Também permite acessar os dados
do usuário pela requisição.

1. pegando o módulo JWT
2. Pegando a configuração necessária para o JWT (a hash para criação do token)
3. pegando o middleware que vai permitir interceptar a requisição antes de chegar à rota,
permitindo assim verificar se o token é válido, para finalmente prosseguir para a rota desejada.
4. dizendo para o nosso controller (express) para usar o middleware (p/ usar em todas as reqs).

*/

const Usuario = require('../models/Usuario');
const { Op } = require("sequelize");

/*
Uma função para gerar um token para o usuário ao logar no app

jwt.sign({o que quer : passar na req}, hashDoToken, {
    propriedades do token ->
    expiresIn : 86400 segundos (24 horas),
});

*/
function gerarToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn : 86400,
    });
}

const multer = require('multer');
const path = require('path')
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, '../src/user_imgs'),
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + Date.now() + path.extname(file.filename) );
    }
});
const upload = multer({multerStorage});


router.get('/usuarios', async (req, res)=>{
    let usuarios = await Usuario.findAll();
    res.json(usuarios);
});
//com o id do usuário, mandar pela body os dados dele para mostrar na 'view' do perfil (react native)


//Login do usuário mandando na body os dados dele + o token gerado pela função
router.post('/login', async (req, res)=>{
    let usuario = await Usuario.findOne({
        where:{
            e_mail: req.body.e_mail,
            senha: req.body.senha
        }
    });

    if(usuario == null){
        res.status(400).send(JSON.stringify({error:"Usuário não encontrado"}));
    }else{
        //Não mostrar a senha no JSON (segurança)
        usuario.senha = undefined;
        res.send({
            usuario,
            /*
            O token também manda na body da requisição informações definidas por nós,
            ou seja, tudo que for passado na nossa função gerarToken
            dentro do jwt.sign() poderá ser acessada globalmente em outros controllers
            pela nossa famosa var req.
            */
            token : gerarToken({ id: usuario.id })
        
        })
    }
});


// Cadastros


router.post('/cadastro', upload.single('foto_perfil'), async (req, res)=>{
    let ver = await Usuario.findOne({
        where:{
            [Op.or]:[
                {e_mail : req.body.e_mail},
                {cpf : req.body.cpf}
            ]
        }
    })
    if (ver != null){
        res.send(JSON.stringify('error'))
    }else{
        Usuario.create({
            nome : req.body.nome,
            e_mail : req.body.e_mail,
            senha : req.body.senha,
            telefone : req.body.telefone,
            data_nasc : req.body.data_nasc,
            sexo : req.body.sexo,
            profissao : req.body.profissao,
            cidade : req.body.cidade,
            uf : req.body.uf,
            cpf : req.body.cpf,
            foto_perfil : req.files.foto_perfil,
            is_voluntario : req.body.is_voluntario,
        })
        
        const usuario = await Usuario.findOne({
            order: [
                [ 'id', 'DESC' ]
            ],
        });
        //console.log(usuario);
        res.send({
            usuario,
            token: gerarToken({ id: usuario.id })
        })
    }
})

/* router.post('/cadastro', upload.single('foto_perfil'), async (req, res)=>{
    console.log(req.files);
    console.log(req.body);
}) */

module.exports = app => app.use('/auth', router);

