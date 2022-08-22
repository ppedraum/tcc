const db = require('./db');


const Evento = db.sequelize.define({
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
    foto:{
        type: db.Sequelize.BLOB('medium'),
        null: false,
    },
    id_tipo_evento:{
        type: db.Sequelize.INTEGER(11),
        null: false,
    },
    id_ONG:{
        type: db.Sequelize.INTEGER(11),
        null: false,
    },
})

module.exports = Evento;