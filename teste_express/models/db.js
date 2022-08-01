const Sequelize = require('sequelize');
const sequelize = new Sequelize('PostApp', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});

sequelize.authenticate().then(()=> {
    console.log('Conectado ao bd PostApp no mysql da porta 3307')
    }).catch((erro)=>{
        console.log('Houve um erro: '+erro);
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

sequelize.sync({alter: true});