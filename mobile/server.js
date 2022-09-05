const Express = require('express');
const app = Express();



const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



const Publicacao = require('./models/Publicacao');
const Usuario = require('./models/Usuario');
const { Op } = require("sequelize");


//------------------ROUTES----------------------//

/* PUBLICAÇÕES */

app.get('/publicacoes', async (req, res)=>{
    let publicacoes = await Publicacao.findAll({
        order:[
            ['datetime_publicacao', 'DESC']
        ]
    });
    res.json(publicacoes);
});
app.get('/publicacoes/:titulo', async (req, res)=>{
    let publicacao = await Publicacao.findAll({
        where:{titulo:{
            [Op.substring]:req.params.titulo
        }},
        order:[
            ['datetime_publicacao', 'DESC']
        ]
    });
    res.json(publicacao);
});

/* app.post('/publicacoes', async (req, res)=>{
    await Publicacao.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    })
    .then(console.log('cadastrado com sucesso!'))
    .catch(err => console.log(err));
}) */

app.delete('/publicacoes/:id', async (req, res)=>{
    await Publicacao.destroy({where:{id: req.body.id}});
});

/* USUÁRIO */


app.get('/usuarios', async (req, res)=>{
    let usuarios = await Usuario.findAll();
    res.json(usuarios);
});

app.post('/usuarios', async (req, res)=>{
    let login = await Usuario.findOne({
        where:{
            e_mail: req.body.e_mail,
            senha: req.body.senha
        }
    });
    if(login == null){
        res.send(JSON.stringify('error'));
    }else{
        res.send(login)
    }
});

app.post('/cadastro', async (req, res)=>{
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
            e_mail : req.body.email,
            senha : req.body.senha,
            telefone : req.body.telefone,
            data_nasc : req.body.datanasc,
            sexo : req.body.sexo,
            profissao : req.body.profissao,
            cidade : req.body.cidade,
            uf : req.body.uf,
            cpf : req.body.cpf,
            foto_perfil : req.body.fotoperfil,
            is_voluntario : req.body.isvoluntario,
        })
    }
})

/*
com o id do usuário, mandar pela body os dados dele para mostrar na 'view' do perfil (react native)
*/



app.listen(3001, (req, res)=>{
    console.log('conectado na porta 3001');
});