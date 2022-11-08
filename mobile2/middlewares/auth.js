const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

/*
exporta a nossa função do middleware
next() -> utilizado para dizer que nosso resource pode prosseguir para a rota
*/
module.exports = (req, res, next) =>{

    //authHeader -> pegando do header o token (authorization)
    const authHeader = req.headers.authorization;

    //Se não houver token manda erro
    if(!authHeader)
        return res.status(401).send(JSON.stringify({error : 'Token não recebido'}));

    //Divide o token entre o Bearer (palavra padrão do JWT) e o token gerado em si
    const parts = authHeader.split(' ');

    //Se não houver essas duas partes manda erro
    if(!parts.lenght === 2)
        return res.status(401).send(JSON.stringify({error : 'Erro de Token'}));

    //Dividindo em variáveis o token
    const [scheme, token] = parts;

    //regex -> Se não houver a palavra Bearer no início do token manda erro
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send(JSON.stringify({error : 'Token malformatado'}));

    
    //Se o token mandado não bate com a hash que gera nossos tokens manda erro
    //Se tiver tudo certo, pega o id do usuário e manda para a req (no JSON)
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send(JSON.stringify({error : 'Token inválido'}));

        //Finalmente manda o resource com o id do usuário para a rota final
        req.id = decoded.id;
        return next();
    })


}