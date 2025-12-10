import { useState, useEffect } from "react";

export const useRequests = (url) => {

    const [data, setData] = useState([]) 

    const [config,setConfig] = useState(null) // CONFIGURAÇÃO DE ENVIO
    const [method,setMethod] = useState(null) // MÉTODO DE ENVIO
    const [callFetch, setCallFetch] = useState(null) // CALL

    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method: "POST",
                Headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            setMethod(method)
        }
    }

    // GET
     useEffect(() => {
        const getData = async () => {
            try {
                const requestData = await fetch(url)
                const responseData = await requestData.json()
                setData(responseData)
            } catch (error) {
                console.log(error.message)
            }
        }
        getData()
    },[url, callFetch])

    // POST
    useEffect(() => {

        const httpRequest = async () => {
            let json 
            try {
            if (method === "POST"){
                let sendOptions = [url, config]
                const res = await fetch(...sendOptions)
                json = await res.json()
            }
            setCallFetch(json)
        }
        catch (error) {
            console.log(error.message)
        }
        }

        httpRequest()

    },[config, method, url])

    // DELETE
    const delRegister = async (url,id) => {
        const responseDelete = await fetch(url, { method: "DELETE" })   
       if (responseDelete.ok) {
        setData(data => data.filter(item => item.id !== id))
    }
}

    // GET - TO UPDATE
    const getProductsUpdate = async (url,id) => {
        const requestUpdate = await fetch(url+"?id="+id)
        const responseUpdate = await requestUpdate.json()
        console.log(responseUpdate)
        setData(responseUpdate)
    }

    // UPDATE
    const updateRegister = async (url,data,id) => {
        const requestUpdateReg = await fetch(url+"/"+id, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        const responseUpdateReg = await requestUpdateReg.json()
        setCallFetch(responseUpdateReg)
    }

    // GET - TO UPDATE - BUTTON SAVE **** traz a lista atualizada
    const getRefreshRegister = async (url) => {
        const requestRefresh = await fetch(url)
        const responseRefresh = await requestRefresh.json()
        setData(responseRefresh)
    }

    // ORDER REGISTERS - TABELAS
    const orderRegisters = (fieldOrder,fieldColumn) => {
        data.sort((a,b) => {
            return a[fieldColumn] < b[fieldColumn] ? -fieldOrder : fieldOrder 
        })
    }

    return { data, httpConfig, delRegister, getProductsUpdate, updateRegister, getRefreshRegister, orderRegisters }

}