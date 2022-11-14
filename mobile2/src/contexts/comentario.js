import { createContext, useState } from 'react';

const CommContext = createContext({
    refresh : false,
    toRefresh : ()=>{},
    stopRefresh : ()=>{}
})

export function CommProvider({children}){

    const [refresh, setRefresh] = useState(false);
    

    async function toRefresh(){
        setTimeout(()=>{setRefresh(true)}, 200);
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