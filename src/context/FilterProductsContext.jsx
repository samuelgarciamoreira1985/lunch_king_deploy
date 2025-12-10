import { useState, createContext } from "react";

export const FilterProdContext = createContext()

export const FilterProdProvider = ({ children }) => {
    const [indexFilterProducts,setIndexFilterProducts] = useState("")

    return (
        <FilterProdContext.Provider value={{indexFilterProducts,setIndexFilterProducts}}>
            {children}
        </FilterProdContext.Provider>
    )
}