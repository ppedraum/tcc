/* i = require('./routes.js');

console.log(i) */


/*
    req -> recebe dados da requisição http que foi feita
    res -> a resposta do servidor ao client (página html, mensagem, download, etc.)
*/

//--------------CONFIGURAÇÕES INICIAIS---------------------//




// PARA CONECTAR AO REACT NATIVEEE
//https://www.alura.com.br/artigos/react-native-fazendo-requisicoes-fetch?gclid=Cj0KCQjw2_OWBhDqARIsAAUNTTF-W9GquhNbS3D738a3cT3DIo1WR0PMzcqXrSUTkoahVtH1fLWJJ1waAoPdEALw_wcB

//https://github.com/axios/axios





const exp = require('express');
const app = exp();

//template engine -> dá mais funções a arquivos específicos (nesse caso HTML)
//ex: repetição, mostrar variáveis diretamente, condicionais dentro do HTML para mostrar algo
const {engine} = require('express-handlebars');

//dizendo para o express que o template engine que está sendo utilizado é o handlebars
//o layout padrão da nossa template engine é o arquivo ./views/layouts/main.handlebars
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Dizendo para o express usar as funções urlencoded e o json do body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//-----------------------MODELS-------------------------//

const Post = require('./models/post');




//-----------------------ROTAS--------------------------//

app.get('/', (req, res) => {
    //sendFile serve para mandar um arquivo como resposta ao client
    Post.findAll({order: [['id', 'DESC']]})
    .then((posts)=>{
        res.render('home', {posts: posts});
    })
    
});

app.get('/cadastro', (req, res)=>{
    //Renderiza o arquivo handlebars cadastro
    //Ele se liga ao arquivo main para formar a estrutura HTML:5 completa
    res.render('form_cadastro');
});

//rotas do tipo post não podem ser acessadas pela URL, somente get pode
//Recebendo dados da rota '/cadastro'
app.post('/add_post', (req, res)=>{
    Post.create({
        titulo : req.body.titulo,
        conteudo : req.body.conteudo
    })
    .then(()=>
        res.redirect('/')
    )
    .catch(
        (erro)=>{
            res.send('Houve um erro: ' + erro)
        }
    );
});


/* app.get('/about', (req, res) => {
    res.send('About');
});

//recebe uma variável chamada user e password com o valor mandado por url (objeto JSON)
app.get('/login/:user/:password', (req, res) => {
    user = req.params.user;
    password = req.params.password;
    //send só pode ser mandado uma vez: é a resposta do servidor à requisição mandada pelo cliente
    //pode mandar HTML tags pelo send 
    res.send('User: '+user+'<br>Password: '+password);
}); */

app.listen(3000, (req, res)=>{
    console.log('Servidor Rodando em http://localhost:3000');
});