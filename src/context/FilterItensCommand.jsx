import { useState, createContext, Children } from "react";

export const ItensCommandContext = createContext()

export const ItensCommandProvider = ({ children }) => {
    const [indexItemCommand,setIndexItemCommand] = useState("")

    return (
        <ItensCommandContext.Provider value={{indexItemCommand,setIndexItemCommand}}>
            {children}
        </ItensCommandContext.Provider>
    )

}