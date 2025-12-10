// CUSTOM HOOKS
import { useState } from "react";
import { useSearch } from "../hooks/useSearch"
//CSS
import "./ListSalesMap.css"
// ÍCONES
import { FaAddressBook } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { SiDwavesystems } from "react-icons/si";
import { BsQrCode } from "react-icons/bs";

const url = "http://localhost:3000/sales"

const ListSalesMap = () => {

    const { data: listSales } = useSearch(url)

    const [checkPayment,setCheckPayment] = useState("")

    const checkValue = (valueSale) => {
        const decimalPart = valueSale.toString().split(".")[1] || ''
        const numberDecimal = decimalPart.length
        if (numberDecimal === 1)
        return numberDecimal + "0"    
      }

  return (

    <div className='list-container-sales'>
        <h2>VENDAS</h2>

        <ul className="general-list-sales">
            {listSales && listSales?.map((sale) => (
              <li className="item-list-sale" key={sale.id}>

                <div className="group-initial-sales">
                    <p>REGISTRO: {sale.registerSaleCommand}</p>
                    <p>CONSUMO: {sale.consumptionSaleCommand}</p>
                    <p>MESA: {sale.tableCommandSale}</p>
                </div>

                <div className="group-items-cart-sale">
                     {sale.itemsSale?.map((itemSale) => (
                      <div className="subgroup-items-cart-sale" key={itemSale.idItemCartSale}>
                        <img src={itemSale.photoItemCartSale} alt="foto do item da comanda da venda" />
                        <div className="items-cart-medium-sale">
                          <p>{itemSale.descItemCartSale}</p>
                          <p>x {itemSale.amountItemCartSale}</p>
                          <p style={{color: "red",fontWeight: "bolder"}}>R$ {checkValue(itemSale.valueSaleItemCartSale) ? itemSale.valueSaleItemCartSale + "0" : itemSale.valueSaleItemCartSale}</p>
                        </div>
                      </div>
                     ))} 
                </div>

                <div className="group-address-sale">
                     <div className="address-title">
                        <p><FaAddressBook className="icon-address"/> DADOS DE ENDEREÇO</p>
                     </div>
                     <div className="address-data">
                        <div className="address-data-initial">
                          <p><span>CEP:</span> {sale.deliveryAddressCep}</p>
                          <p><span>LOGRADOURO:</span> {sale.deliveryAddressRoad}</p>
                          <p><span>NÚMERO:</span> {sale.deliveryAddressNumber}</p>               
                        </div>
                        <div className="address-data-medium">
                          <p><span>BAIRRO:</span> {sale.deliveryAddressHood}</p>
                          <p><span>CIDADE:</span> {sale.deliveryAddressCity}</p>
                          <p><span>ESTADO:</span> {sale.deliveryAddressState}</p>
                          <p><span>UF:</span> {sale.deliveryAddressUf}</p>
                          <p><span>REGIÃO:</span> {sale.deliveryAddressRegion}</p>
                        </div>
                     </div>
                </div>

                <div className="group-invoicing-sale">
                     <div className="invoicing-title">
                          <p><FaMoneyBill1Wave className="icon-address"/> DADOS DE FATURAMENTO</p>
                     </div>
                     <div className="invoicing-initial">
                          <p style={{color: "red",fontWeight: "bolder"}}><span style={{color:"#000", fontStyle:"italic",fontFamily:"revert"}}>VALOR TOTAL: </span> R$ {checkValue(sale.valueSale) ? sale.valueSale + "0" : sale.valueSale}</p>
                          <p style={{color: "red",fontWeight: "bolder"}}><span style={{color:"#000", fontStyle:"italic",fontFamily:"revert"}}>FORMA DE PAGAMENTO:</span> {sale.paymentMethod}</p>
                     </div>
                     <div className="payment-types-sales">
                          {sale.paymentMethod === "DINHEIRO" ? (<div className="money-sales">
                            <p style={{color: "red",fontWeight: "bolder"}}><span style={{color:"#000", fontStyle:"italic",fontFamily:"revert"}}><GiMoneyStack className="icon-money-input"/> VALOR DE ENTRADA:</span> R$ {checkValue(sale.inputValueSale) ? sale.inputValueSale + "0" : sale.inputValueSale}</p>
                            <p style={{color: "red",fontWeight: "bolder"}}><span style={{color:"#000", fontStyle:"italic",fontFamily:"revert"}}><GrMoney className="icon-money-change"/> TROCO:</span> R$ {checkValue(sale.changeValueSale) ? sale.changeValueSale + "0" : sale.changeValueSale}</p>

                          </div>) : sale.paymentMethod === "CARTÃO" ? (<div className="card-sales">
                            <div className="card-sales-initial">
                              <p><span>TIPO:</span> {sale.typePaymentCard}</p>
                              <p><span>NOME:</span> {sale.cardName}</p>
                              <p><span>NÚMERO:</span> {sale.cardNumber}</p>
                            </div>
                            <div className="card-sales-finally">
                              <p><span>CPF/CNPJ:</span> {sale.cpfCnpjHolder}</p>
                              <p><span>BANDEIRA:</span> {sale.cardFlag}</p>
                              <p><span>VALIDADE:</span> {sale.expirationDateCard}</p>
                              <p><span>CÓDIGO DE SEGURANÇA:</span> {sale.cvcCwCard}</p>
                            </div>

                          </div>) : (<div className="pix-sales">           
                            <p><BsQrCode className="icon-qrcode-pix"/>VALOR DO QRCODE <span style={{color:"red"}}>R$ {checkValue(sale.qrCodePisSale) ? sale.qrCodePisSale + "0" : sale.qrCodePisSale}</span></p> 
                          </div>)}

                      </div>
                </div>

                <div className="list-sales-finally">
                     <div className="list-finally-title">
                          <p><SiDwavesystems  className="icon-system"/> DADOS DE SISTEMA</p>
                     </div>
                     <div className="finally-data-sales-list">
                                        <div className="finally-sales-date-list">
                                            <p><span style={{fontFamily:"inherit"}}>DATA:</span></p>
                                            <p>{sale.dateSale}</p>
                                        </div>
                                        <div className="finally-sales-hour-list">
                                            <p><span style={{fontFamily:"inherit"}}>HORA:</span> </p>
                                            <p>{sale.hourSale}</p>
                                        </div>
                                        <div className="finally-sales-status-list">
                                            <p><span style={{fontFamily:"inherit"}}>SITUAÇÃO:</span> </p>
                                            <p>{sale.paymentStatus}</p>
                                        </div>                       
                                    </div>
                </div>

              </li>
            ))}
        </ul>

    </div>

  )
}

export default ListSalesMap