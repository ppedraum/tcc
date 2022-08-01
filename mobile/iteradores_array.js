const empresas = [
    { nome:'Samsung',valorDeMercado: 50, CEO: 'Kim Hyun Suk', anoDeCriacao: 1938},
    { nome: 'Microsoft',valorDeMercado: 415, CEO: 'Satya Nadella', anoDeCriacao: 1975 },
    { nome: 'Intel',valorDeMercado: 117, CEO:'Brian Krzanich', anoDeCriacao: 1968},
    { nome: 'Facebook',valorDeMercado: 383, CEO:'Mark Zuckerberg', anoDeCriacao: 2004},
    { nome: 'Spotify',valorDeMercado: 30, CEO:'Daniel Ek', anoDeCriacao: 2006  },
    {nome: 'Apple', valorDeMercado: 845, CEO: 'Tim Cook', anoDeCriacao: 1976}
];

//-----LOOP for usando forEach-------//

empresas.forEach((empresa)=>console.log(empresa));

//-----Alteração usando map (retorna o mesmo número de itens do array)-------//

uppEmpresas = empresas.map((empresa)=>{return empresa.nome.toUpperCase()});
console.log(uppEmpresas);

//-----Filtrando com filter-------//

empMenosSamsung = empresas.filter((empresa)=>empresa.nome != 'Samsung');
empNovas = empresas.filter((empresa)=>empresa.anoDeCriacao >= 2000);

console.log(empMenosSamsung);
console.log(empNovas);