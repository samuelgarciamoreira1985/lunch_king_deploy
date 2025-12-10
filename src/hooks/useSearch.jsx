import { useState, useEffect } from "react";

export const useSearch = (url) => {

    const [data, setData] = useState(null) 

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
    },[url])

    const getProductsType = async (url,valueTypeProduct) => {
        const requestGetProdType = await fetch(url+"?typeProduct="+valueTypeProduct)
        const responseGetProdType = await requestGetProdType.json()
        setData(responseGetProdType)
    }

    return { data, getProductsType }

















}