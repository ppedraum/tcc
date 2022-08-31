const db = require('./db');

const Like = db.sequelize.define('Like', 
    {
        id_ong:{
            type: db.Sequelize.INTEGER(11),
            primaryKey: true
        },
        id_usuario:{
            type: db.Sequelize.INTEGER(11),
            primaryKey: true
        }
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    }
)

module.exports = Like;