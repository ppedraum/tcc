const Express = require('express');
const app = Express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

require('./Controllers/AuthController')(app);
require('./Controllers/SignEvtsController')(app);
require('./Controllers/ProjectController')(app);
require('./Controllers/ProfileController')(app);
require('./Controllers/PostInteractionController')(app);

app.get('/', async (req, res)=>{
    res.send('ok');
})

app.listen(3001, (req, res)=>{
    console.log('conectado na porta 3001');
});