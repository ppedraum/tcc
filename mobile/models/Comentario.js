const db = require('./db');

const Comentario = db.sequelize.define('Comentario', {
    id:{
        type: db.Sequelize.INTEGER(15),
        primaryKey : true,
    },
    conteudo:{
        type: db.Sequelize.STRING(255)
    },
    id_usuario:{
        type: db.Sequelize.INTEGER(11),
    },
    id_comentario:{
        type: db.Sequelize.INTEGER(11)
    },
    id_pai:{
        type: db.Sequelize.INTEGER(11)
    }
});

module.exports = Comentario;