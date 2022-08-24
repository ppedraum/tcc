const db = require('./db');

const Instituicao = db.sequelize.define('ong',
{
    id:{
        type: db.Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    cnpj:{
        type: db.Sequelize.STRING(50),
        null: false,
    },
    login:{
        type: db.Sequelize.STRING(50),
        null: false,
    },
    senha:{
        type: db.Sequelize.INTEGER(50),
        null: false,
    },
    nome:{
        type: db.Sequelize.STRING(144),
        null: false,
    },
    nome_fantasia:{
        type: db.Sequelize.STRING(144),
        null: false,
    },
    sede:{
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
    cep:{
        type: db.Sequelize.STRING(9),
        null: false,
    },
    telefone:{
        type: db.Sequelize.INTEGER(21),
        null: false,
    },
    data_abertura:{
        type: db.Sequelize.DATE,
        null: false,
    },
    id_area_atuacao:{
        type: db.Sequelize.INTEGER(11),
        null: false,
    },
    foto_perfil:{
        type: db.Sequelize.BLOB('medium'),
        null: true,
    },


},
    {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    }
)

module.exports = Instituicao;