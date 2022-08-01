const db = require('./db');

Post = db.sequelize.define('Post',{

    id:{
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo:{
        type: db.Sequelize.STRING,
        defaultValue: '',
        null: false,
    },
    conteudo:{
        type: db.Sequelize.TEXT,
        null: false,
    }
    },
    {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,

        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'Post',
    }
);

//Post.sync({alter:true});

module.exports = Post;