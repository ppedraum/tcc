const db = require('./db');

const Comentario = db.sequelize.define('Comentario', 

    {
        id:{
            type: db.Sequelize.INTEGER(15),
            primaryKey : true,
            autoIncrement : true,
            null: false
        },
        conteudo:{
            type: db.Sequelize.STRING(255),
            null: false
        },
        id_publicacao:{
            type: db.Sequelize.INTEGER(11),
            null: false
        },
        id_usuario:{
            type: db.Sequelize.INTEGER(11),
            null: false
        },
        id_pai:{
            type: db.Sequelize.INTEGER(11),
            null: true
        },
        data_post:{
            type: db.Sequelize.DATE,
            null: false
        }
    },
    {
        timestamps : false,
        underscored: true,
        freezeTableName: true,
    }
);

module.exports = Comentario;