import { useState } from "react";
export const useAlert2 = ( schemaVerif ) => {
    const [ alerte2 , setAlerte2 ] = useState({})
    const getError2 = (data) => {
        const {error} =  schemaVerif.validate(data , {abortEarly : false})
        if(error) {
            const messagesErreur = error.details.map(m => m.message);
            setAlerte2({ type : 'danger' , liste : messagesErreur });
            return true; 
        }
        return false ;
    }
    return [alerte2 , setAlerte2 , getError2]
}