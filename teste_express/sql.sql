/*
    abrir cmd e digitar
    mysql -h localhost -P 3307 -u root -p 
    12345

    estrutura:
*/

create table testesequelize;
use testesequelize;

create table usuario(
    id int not null AUTO_INCREMENT,
    nome varchar(50) not null,
    senha varchar(50) not null,
    primary key(id)
);