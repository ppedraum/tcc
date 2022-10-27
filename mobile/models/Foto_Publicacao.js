const db = require('./db');

const Foto_Publicacao = db.sequelize.define('Foto_Publicacao',
    {
        id:{
            type : db.Sequelize.INTEGER(11),
            primaryKey : true,
            autoIncrement : true,
            null : false
        },
        foto:{
            type : db.Sequelize.TEXT('medium'),
            null : false
        },
        descricao:{
            type : db.Sequelize.ARRAY(144),
            null : true
        },
        id_publicacao : {
            type: db.Sequelize.INTEGER(11),
            null : false
        }
    },
    {
        createdAt: false,
        updatedAt: false,
        underscored: true,
        freezeTableName: true,
    }
);

module.exports = Foto_Publicacao;