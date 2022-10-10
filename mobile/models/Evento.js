const db = require('./db');


const Evento = db.sequelize.define('Evento', {
        id:{
            type: db.Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        endereco:{
            type: db.Sequelize.STRING(144),
            null: false,
        },
        cidade:{
            type: db.Sequelize.STRING(50),
            null: false,
        },
        uf:{
            type: db.Sequelize.CHAR(2),
            null: false,
        },
        datetime_inicio:{
            type: db.Sequelize.DATE,
            null: false,
        },
        datetime_fim:{
            type: db.Sequelize.DATE,
            null: false,
        },
        qtd_inscricoes:{
            type: db.Sequelize.INTEGER(11),
            null: false,
        },
        is_terminado:{
            type: db.Sequelize.BOOLEAN,
            null: false,
        },
        id_tipo_evento:{
            type: db.Sequelize.INTEGER(11),
            null: false,
        },
        id_ong:{
            type: db.Sequelize.INTEGER(11),
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

module.exports = Evento;