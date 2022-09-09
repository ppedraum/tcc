import { createContext, useState, useEffect } from 'react';

const CommContext = createContext({
    refresh : false,
    toRefresh : ()=>{},
    stopRefresh : ()=>{}
})

export function CommProvider({children}){

    const [refresh, setRefresh] = useState(false);

    function toRefresh(){
        setRefresh(true);
    }

    function stopRefresh(){
        setRefresh(false);
    }

    return (
        <CommContext.Provider value={{refresh, toRefresh, stopRefresh}} >
            {children}
        </CommContext.Provider>
    );
}

export default CommContext;