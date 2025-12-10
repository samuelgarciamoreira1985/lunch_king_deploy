import { useState, useEffect } from "react";

export const useSend = (urlCommand) => {

    const [dataCommand,setDataCommand] = useState(null) // DADOS

    // GET - SALES-> COMMANDS
    const getCommandsInSales = async (urlCommand,id) => {
        const requestUpdate = await fetch(urlCommand+"?idCommand="+id)
        const responseUpdate = await requestUpdate.json()
        console.log(responseUpdate)
        setDataCommand(responseUpdate)
    }
    

    return { dataCommand,getCommandsInSales }
}