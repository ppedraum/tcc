//Nosso contexto para a autenticação
/*
O context basicamente serve para gravar informações necessárias para vários componentes,
como tokens de autenticação.

Podemos então envolver a parte que queremos que tenha essas informações com o Context.Provider,
onde todos os componentes herdam-nas.
*/

import { createContext } from 'react';

//criando o contexto e dizendo qual o formato dele (atributos que vão ser passados para ele)
//O que é passado na função não é o valor default, mas sim o formato dos atributos dela.
//Bom para que o react entenda quais são os attrs
const AuthContext = createContext({signed:false, token:'', user:{}});

/*
Exportamos o Provider com o parâmetro children, que recebe pelo react todos os componentes
que vão estar dentro desse componente, e assim repassamos normalmente os valores para lá
*/

export function AuthProvider({children}){
    return (
        <AuthContext.Provider value={{signed:false, token:'', user:{}}} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;