const Sequelize = require('sequelize');
const sequelize = new Sequelize('pong', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

sequelize.authenticate().then(()=> {
    //console.log('Conectado ao bd PostApp no mysql da porta 3306')
    }).catch((erro)=>{
        //console.log('Houve um erro: '+erro);
});

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
};

/* sequelize.sync({alter: true}); */