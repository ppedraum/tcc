

let objeto = {
    nome: 'pedro',
    senha: '123'
};

function handleSetObjeto(chave, valor){
    let novoObjeto = JSON.parse(JSON.stringify(objeto));
    novoObjeto[chave] = valor;
    setObjeto(novoObjeto);
}

function setObjeto(obj){
    objeto = obj;
}


console.log('Objeto antes: ', objeto);

handleSetObjeto('nome', 'marcos');

console.log('Objeto dps: ', objeto);



