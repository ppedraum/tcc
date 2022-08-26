const db = require('./db');

const Usuario = require('./Usuario')
const Evento = require('./Evento')

const Inscricao = db.sequelize.define('Inscricao', {
        id_evento : {
            type: db.Sequelize.INTEGER(11),
            primaryKey : true,
            null: false,
        },
        id_usuario : {
            type: db.Sequelize.INTEGER(11),
            primaryKey : true,
            null: false,
        },
    },
    {
        createdAt: false,
        updatedAt: false,
        underscored: true,
        freezeTableName: true,
    }

);

module.exports = Inscricao;