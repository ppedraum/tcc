const db = require('./db');


const Inscricao = db.sequelize.define('Inscricao', {
        id_evento : {
            type: db.Sequelize.INTEGER(11),
            primaryKey : true,
        },
        id_usuario : {
            type: db.Sequelize.INTEGER(11),
            primaryKey : true,
        },
    },
    {
        createdAt: false,
        updatedAt: false,
        underscored: true,
        freezeTableName: true,
    }

)

module.exports = Inscricao;