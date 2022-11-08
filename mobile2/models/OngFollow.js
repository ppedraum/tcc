const db = require('./db');

const OngFollow = db.sequelize.define('ong_follow', 
    {
        id_ong: {
            type : db.Sequelize.INTEGER(11),
            null : false,
            primaryKey: true,
        },
        id_usuario: {
            type : db.Sequelize.INTEGER(11),
            null : false,
            primaryKey: true
        }, 
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    }
);

module.exports = OngFollow;