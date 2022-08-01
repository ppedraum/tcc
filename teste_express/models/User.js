db = require('./db');

Usuario = db.sequelize.define("Usuario", {
    id:{
        primaryKey: true,
        type: db.Sequelize.INTEGER,
        autoIncrement: true
    },
    nome:{
        type: db.Sequelize.STRING,
        null: false,
        blank: false
    },
    senha:{
        type: db.Sequelize.STRING,
        null: false,
        blank: false
    }
}, {
    timestamps: false,
    underscored: true,
    freezeTableName: true
});

module.exports = Usuario;

var result;

/* Usuario.findAll()
.then(result => console.log(JSON.stringify(result, null, 2))); */

//Usuario.sync({alter: true});