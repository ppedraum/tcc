import { createContext, useState } from 'react';

const CommContext = createContext({
    comentarios : [],
    getComentarios : ()=>{}
})

export function CommProvider({children}){

    const [refresh, setRefresh] = useState(false);
    

    function toRefresh(bool){
        setRefresh(bool);
    }

    return (
        <CommContext.Provider value={{refresh, toRefresh}} >
            {children}
        </CommContext.Provider>
    );
}

export default CommContext;