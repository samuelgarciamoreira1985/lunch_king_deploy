// CUSTOM HOOKS
import { useState } from "react"
import { useSearch } from "../hooks/useSearch"
// CSS
import "./ListCommandsMap.css"

const url = "http://localhost:3000/commands"

export const ListCommandsMap = () => {

    const { data: itemCommand } = useSearch(url)

    const [colorValue,setColorValue] = useState("#ff0000")

    const checkValue = (valueSale) => {
        const decimalPart = valueSale.toString().split(".")[1] || ''
        const numberDecimal = decimalPart.length
        if (numberDecimal === 1)
        return numberDecimal + "0"    
      }

  return (

    <div id="list-commands-container">
        <h2>COMANDAS</h2>
        <ul id="general-list-commands">
          {itemCommand && itemCommand.map((command) => (
            <li className="item-list-commands" key={command.idCommand}>
                <div className="subgroup-item-initial">
                  <p style={{textDecoration: "underline"}}>MESA {command.tableCommand}</p>
                  <p>{command.typeConsumption}</p>
                </div>

                <div className="group-item-commands">
                {command.item.map((item) => (
                  <div className="subgroup-item-commands" key={item.idItemCart}>
                    <img src={item.photoItemCart} alt="foto do produto" />
                      <div className="subgroup-item-values">
                        <p>{item.descItemCart}</p>
                        <p>{item.amountItemCart} un</p>
                        <p style={{color: "red",fontWeight: "bolder"}}>R$ {checkValue(item.valueSaleItemCart) ? item.valueSaleItemCart + "0" : item.valueSaleItemCart}</p>
                      </div>
                    
                  </div>
                )
                )}
                </div>

                <div className="subgroup-item-finally">
                  <div className="finally-itens">
                    <p>Valor Total</p>
                    <p>R$ {checkValue(command.totalAmount) ? command.totalAmount + "0" : command.totalAmount}</p>
                  </div>
                  <div className="finally-itens">
                    <p>Data</p>
                    <p>{command.dateSystemCommand}</p>
                  </div>
                  <div className="finally-itens">
                    <p>Hora</p>
                    <p>{command.hourCommand}</p>
                  </div>
                  <div className="finally-itens">
                    <p>Situação</p>
                    <p style={{color: command.statusCommand === "PENDENTE" ? "#ff0000" : "#018a01" }}>{command.statusCommand}</p>
                  </div>
                </div>

            </li>
          ))}
        </ul>
    </div>

  )
}
