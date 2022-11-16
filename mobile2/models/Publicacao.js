const db = require('./db');

Publicacao = db.sequelize.define('Publicacao',{

    id:{
        type: db.Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    titulo:{
        type: db.Sequelize.STRING(50),
        null: false,
    },
    descricao:{
        type: db.Sequelize.STRING(300),
        null: false,
    },
    qtd_likes:{
        type: db.Sequelize.INTEGER(11),
        null: false,
    },
    qtd_compartilhamentos:{
        type: db.Sequelize.INTEGER(11),
        null: false,
    },
    datetime_publicacao:{
        type: db.Sequelize.DATE,
        null: false,
    },
    tipo_publicacao:{
        type: db.Sequelize.STRING(16),
        null: false,
    },
    id_ong:{
        type: db.Sequelize.INTEGER(11),
        null: false,
    },
    id_evento:{
        type: db.Sequelize.INTEGER(11),
        defaultValue: null,
        null: true,
    },
    id_req_voluntariado:{
        type: db.Sequelize.INTEGER(11),
        defaultValue: null,
        null: true,
    },


    },
    {
        createdAt: 'datetime_publicacao',
        updatedAt: false,
        underscored: true,
        freezeTableName: true,
    }
);

/* Post.sync({alter:true}); */

module.exports = Publicacao;