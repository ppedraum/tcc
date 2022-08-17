const db = require('./db');

Usuario = db.sequelize.define('Usuario',{

    id:{
        type: db.Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    nome:{
        type: db.Sequelize.STRING(144),
        null: false,
    },
    e_mail:{
        type: db.Sequelize.STRING(144),
        null: false,
    },
    senha:{
        type: db.Sequelize.INTEGER(50),
        null: false,
    },
    telefone:{
        type: db.Sequelize.INTEGER(21),
        null: false,
    },
    data_nasc:{
        type: db.Sequelize.DATE,
        null: false,
    },
    sexo:{
        type: db.Sequelize.CHAR(4),
        null: false,
    },
    profissao:{
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
    cpf:{
        type: db.Sequelize.STRING(14),
        null: false,
    },
    foto_perfil:{
        type: db.Sequelize.BLOB('medium'),
        null: true,
    },
    is_voluntario:{
        type: db.Sequelize.BOOLEAN,
        null: true,
    },


    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    }
);

module.exports = Usuario;