//pega o módulo do sequelize
const Sqlize = require('sequelize')

/*
    Cria um novo objeto Sqlize com os parâmetros:
    nome do esquema (banco de dados),
    nome do usuário,
    senha do usuário,
    objeto JSON com os atributos: ip do servidor e dialeto (mariaDB, sqlite, mysql, etc.)
*/
/*
sequelize = new Sqlize('testedb', '', '12345', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

sequelize.authenticate().then(()=> {
    console.log('Conectado ao bd testedb no mysql da porta 3306 (xampp)')
    }).catch((erro)=>{
        console.log('Houve um erro: '+erro);
})

*/
sequelize = new Sqlize('testesequelize', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
})

//verificar se o banco de dados conectou
/*
    callbacks:
    sucesso (then)
    falha(catch)
*/
sequelize.authenticate().then(()=> {
    console.log('Conectado ao bd testesequelize no mysql da porta 3307')
    }).catch((erro)=>{
        console.log('Houve um erro: '+erro);
})

/*
    Modelos do sequelize --> tables do banco
    params:
    nome da table, cols da table (tipo, se é null, se é primary, etc.)
*/

const Usuario = sequelize.define('usuario', {
    nome:{
        type: Sqlize.STRING,
        null: false,
        /*blank: deixa o campo ser salvo como '' */
    },
    senha:{
        type: Sqlize.STRING,
        null: false,
    }
},
{
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    tableName: 'Usuario',

}
)

const Postagem = sequelize.define('Postagem',{

        id:{
            type: Sqlize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo:{
            type: Sqlize.STRING,
            defaultValue: '',
            null: false,
        },
        conteudo:{
            type: Sqlize.TEXT,
            null: false,
        }
    },
    {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,

        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'Postagem',
    }
)

/* Postagem.create({
    titulo: 'Teste',
    conteudo: 'Teste Conteudo',
})

Usuario.create({
    nome: 'Isa',
    senha: '321',
}) */

/*
    Postagem/Usuario.drop() -> dropa a table

*/

/* Usuario.sync();
Postagem.sync(); */
sequelize.sync({alter: true});