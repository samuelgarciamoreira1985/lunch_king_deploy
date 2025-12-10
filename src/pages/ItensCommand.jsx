//REACT
import { useContext, useEffect, useState } from "react"
import {ItensCommandContext} from "../context/FilterItensCommand"
// CONTEXT
import { CartContext } from "../context/ItensCartContext"
// CUSTOM HOOKS
import { useSearch } from "../hooks/useSearch"
// CSS
import "./ItensCommand.css"

const url = "http://localhost:3000/products"

const ItensCommand = () => {

    const { data: itemProducts, getProductsType } = useSearch(url)

    const { indexItemCommand,setIndexItemCommand } = useContext(ItensCommandContext)
    const { item,setItem,countAmount,setCountAmount,totalAmount,setTotalAmount,isItem,setIsItem } = useContext(CartContext)

    const [idCountAmount,setIdCountAmount] = useState(0)

    const incrementAmount = (idItem) => {
        setIdCountAmount(idItem)
        console.log("id pego: " + idItem)
        if (idItem === idCountAmount){
            setCountAmount(countAmount+1)
        }
        else
            setCountAmount(0)
    }

    const decrementAmount = (idItemD) => {
        setIdCountAmount(idItemD)
        console.log("id pego: " + idItemD)
        if (idItemD === idCountAmount){
            if (countAmount === 0){
                setCountAmount(0)
            } else {
                setCountAmount(countAmount-1)
            }
        } else 
            setCountAmount(0)
    }

    const addItem = (idItem,descItem,photoItem,amountItem,valueSaleItem) => { // BOTÃO ADICIONAR ITEM INDIVIDUAL
           const newItemCart = {
            "idItemCart": idItem,
            "descItemCart": descItem,
            "photoItemCart": photoItem,
            "amountItemCart": amountItem,
            "valueSaleItemCart": valueSaleItem
            }

            if (countAmount === 0) {
                swal({
                     closeOnClickOutside: false,
                     icon: "warning",
                     title: "REI DOS LANCHES",
                     text: "Informe a quantidade desejada para adicionar o item no carrinho!"
                 }) 
            } 
            else {
                const existsItem = item.some(item => item.idItemCart === newItemCart.idItemCart)
            if (existsItem) {
               swal({
                     closeOnClickOutside: false,
                     icon: "error",
                     title: "REI DOS LANCHES",
                     text: "Esse produto ja consta no carrinho!"
                 })
            } else {
                setItem(prevItens => [...prevItens,newItemCart])
                // Calcula o valor do total da comanda***
                const calcTotalAmount = valueSaleItem * amountItem
                const generalTotalAmount = totalAmount + calcTotalAmount
                const AmountTotal = roundNumber(generalTotalAmount, 2)
                setTotalAmount(AmountTotal)
                setCountAmount(0)
            }     
            }            
    }

    const roundNumber = (numberTotal, roundParam) => {
        let numTotal = Math.pow(10, roundParam)
        return Math.trunc(numberTotal * numTotal) / numTotal
    }

    useEffect(() => {
        getProductsType(url,indexItemCommand)
      },[indexItemCommand])

  return (

    <div className="itens-command-container">
        <ul className="general-list-itens-command">
            {isItem !== false ? itemProducts?.map((itemProdComm) => (
                
                    <li className="item-list-command" key={itemProdComm.idProduct}>
                        <div className="photo-product-item-command"><img src={itemProdComm.photoProduct} alt="foto do produto" /></div>
                        <div className="item-list-command-secound">
                            <p>{itemProdComm.descriptionProduct}</p>
                            <p style={{color:"red"}}>R$ {itemProdComm.valueSaleProduct}</p>

                            <div className="buttons-counter">
                                <button type="button" onClick={() => addItem(itemProdComm.id,itemProdComm.descriptionProduct,itemProdComm.photoProduct,countAmount,itemProdComm.valueSaleProduct)}>ADICIONAR</button>
                                <div className="btn-counter">
                                    <button className="btn-counter-itens" type="button" onClick={() => incrementAmount(itemProdComm.idProduct)}>+</button>
                                    <span>{itemProdComm.idProduct === idCountAmount ? countAmount : 0}</span>
                                    <button className="btn-counter-itens" type="button" onClick={() => decrementAmount(itemProdComm.idProduct)}>-</button>
                                </div>
                            </div>
                        </div>
                    </li>
                  
            )) : ""}
        </ul>
      
    </div>

  )
}

export default ItensCommand