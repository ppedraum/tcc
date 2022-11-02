import { createContext, useState, useEffect } from 'react';

const CadContext = createContext({
    dados: {
        nome: '',
        e_mail: '',
        senha: '',
        telefone: '',
        data_nasc: new Date(),
        sexo: '',
        profissao: '',
        cidade: '',
        uf: '',
        cpf: '',
        foto_perfil: '',
        is_voluntario: false
    },
    setDado: (chave, valor)=>{}
});

export function CadProvider({children}){

    const [dados, setDados] = useState({
        nome: '',
        e_mail: '',
        senha: '',
        telefone: '',
        data_nasc: new Date(),
        sexo: '',
        profissao: '',
        cidade: '',
        uf: '',
        cpf: '',
        foto_perfil: '',
        is_voluntario: false
    });

    function setDado(chave, valor){
        let dadosCopia = JSON.parse(JSON.stringify(dados));
        dadosCopia[chave] = valor;
        setDados(dadosCopia);
    }

    return(
        <CadContext.Provider value={{dados, setDado}}>
            {children}
        </CadContext.Provider>
    );

}

export default CadContext;