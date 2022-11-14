
let arr = [
    {
        id: 1,
        nome: 'Pedro',
        id_pai: null    
    },
    {
        id: 2,
        nome: 'Mauricio',
        id_pai: null    
    },
    {
        id: 3,
        nome: 'Joana',
        id_pai: 2    
    },
    {
        id: 4,
        nome: 'Joao',
        id_pai: 2
    }
]

let filhos = arr.filter((pessoa)=>pessoa.id_pai == 2);

//filtramos os objetos que nao pertencem aos filhos, ou seja, todos menos os filhos.
arr = arr.filter(pessoa=>filhos.indexOf(pessoa) < 0);

console.log('filhos: ', filhos)
console.log('pais / sem filhos: ', arr);