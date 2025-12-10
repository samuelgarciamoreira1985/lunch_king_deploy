// REACT
import { Tooltip } from "@mui/material"
import { useState,useRef, useEffect,useId } from "react";
import QRCode from 'react-qr-code'
import { useRequests } from "../hooks/useRequests"
import { useSend } from "../hooks/useSend";
import Modal from "react-modal";
// CSS
import "./Sales.css"
//ÍCONES
import { ImCart } from "react-icons/im";
import { FaAddressCard,FaCcMastercard,FaCcDiscover,FaAddressBook } from "react-icons/fa";
import { FaMoneyBillWave,FaPix,FaFileInvoiceDollar,FaMoneyBill1Wave  } from "react-icons/fa6";
import { GiMoneyStack,GiReceiveMoney,GiPayMoney, GiConsoleController,GiConfirmed    } from "react-icons/gi"
import { HiMiniCreditCard } from "react-icons/hi2";
import { RiVisaFill } from "react-icons/ri";
import { SiNubank,SiDwavesystems,SiCeph   } from "react-icons/si";
import { MdCreateNewFolder } from "react-icons/md"
import { TiCancel } from "react-icons/ti"
import { BiBullseye, BiSolidSave,BiSolidSearch } from "react-icons/bi"
import { GrMoney } from "react-icons/gr";
import { data, useLinkClickHandler, useViewTransitionState } from "react-router-dom";
import { BsQrCode,BsDatabaseFillAdd  } from "react-icons/bs";
//IMAGENS
import logoSystemMainHeader from "../assets/images/logo-system.png"

const url = "http://localhost:3000/sales"
const urlCommand = "http://localhost:3000/commands"

const Sales = () => {

    const { data: sales,getRefreshRegister,httpConfig,delRegister } = useRequests(url)
    const { dataCommand: commandSale,getCommandsInSales } = useSend(urlCommand)

    const [controlMapCart,setControlMapCart] = useState(false) // CONTROLE - MAP DO CARRINHO

    const [idSale,setIdSale] = useState("") // [REQUEST] ID
    const [registerSaleCommand,setRegisterSaleCommand] = useState("") // [REQUEST] REGISTRO
    const [consumptionSaleCommand,setConsumptionSaleCommand] = useState("") // [REQUEST] CONSUMO
    const [tableCommandSale,setTableCommandSale] = useState("") // [REQUEST] MESA
    const [deliveryAddressCep,setDeliveryAddressCep] = useState("") // [REQUEST] CEP
    const [deliveryAddressRoad,setDeliveryAddressRoad] = useState("") // [REQUEST] LOGRADOURO
    const [deliveryAddressNumber,setDeliveryAddressNumber] = useState("") // [REQUEST] NÚMERO
    const [deliveryAddressHood,setDeliveryAddressHood] = useState("") // [REQUEST] BAIRRO
    const [deliveryAddressCity,setDeliveryAddressCity] = useState("") // [REQUEST] CIDADE
    const [deliveryAddressState,setDeliveryAddressState] = useState("") // [REQUEST] ESTADO
    const [deliveryAddressUf,setDeliveryAddressUf] = useState("") // [REQUEST] UF
    const [deliveryAddressRegion,setDeliveryAddressRegion] = useState("") // [REQUEST] REGIÃO
    const [valueSale,setValueSale] = useState(0) // [REQUEST] TOTAL DA VENDA
    const [paymentMethod,setPaymentMethod] = useState("") // [REQUEST] MÉTODO DE PAGAMENTO]
    const [inputValueSale,setInputValueSale] = useState("") // [REQUEST] VALOR DE ENTRADA - DINHEIRO
    const [changeValueSale,setChangeValueSale] = useState("") // [REQUEST] TROCO - DINHEIRO
    const [typePaymentCard,setTypePaymentCard] = useState("") // [REQUEST] TIPO DO CARTÃO - CRÉDITO OU DÉBITO
    const [cardNumber,setCardNumber] = useState("") // [REQUEST] NÚMERO DO CARTÃO
    const [cardFlag,setCardFlag] = useState("") // [REQUEST] BANDEIRA DO CARTÃO
    const [expirationDateCard,setExpirationDateCard] = useState("") // [REQUEST] DATA DE VALIDADE DO CARTÃO
    const [cvcCwCard,setCvcCwCard] = useState("") // [REQUEST] CÓDIGO DE SEGURANÇA DO CARTÃO
    const [cardName,setCardName] = useState("") // [REQUEST] NOME DO CARTÃO
    const [cpfCnpjHolder,setCpfCnpjHolder] = useState("") // [REQUEST] CPF OU CNPJ DO CARTÃO
    const [hourSale,setHourSale] = useState("") // [REQUEST] HORA DA VENDA
    const [paymentStatus,setPaymentStatus] = useState("PENDENTE") // [REQUEST] STATUS DA VENDA
    const [itemsSale,setItemsSale] = useState([]) // [REQUEST] ITÉNS DO CARRINHO - VENDA
    const [qrCodePisSale,setQrCodePisSale] = useState(0) // [REQUEST] GERA O QRCODE - PIX

    const [isDisabledPaymentAll,setIsDisabledPaymentAll] = useState("none") // DESATIVA EVENTOS DA DIV DE PAGAMENTOS
    const [isDisabledIdSales,setIsDisabledIdSales] = useState(true)    // DESATIVA ID DA VENDA
    const [isDisabledBtnCep,setIsDisabledBtnCep] = useState(true) // DESATIVA - BOTÃO DE CONSULTA DE CEP
    const [isDisabledCursorBtnCep,setIsDisabledCursorBtnCep] = useState("default") // DESATIVA - CURSOR BUSCA DE CEP
    const [isDisabledRegister,setIsDisabledRegister] = useState(true) // DESATIVA - CAMPO DE REGISTRO
    const [isDisabledBtnItems,setIsDisabledBtnItems] = useState(true) // DESATIVA - BOTÃO DE BUSCA DE PRODUTOS
    const [isDisabledCursorBtnItems,setIsDisabledCursorBtnItems] = useState("default") // DESATIVA - CURSOR BUSCA
    const [isDisabledAddressCep,setIsDisabledAddressCep] = useState(true) // DESATIVA - CEP
    const [isDisabledAddressRoad,setIsDisabledAddressRoad] = useState(true) // DESATIVA - LOGRADOURO
    const [isDisabledAddressNumber,setIsDisabledAddressNumber] = useState(true) // DESATIVA - NÚMERO
    const [isDisabledAddressHood,setIsDisabledAddressHood] = useState(true) // DESATIVA - BAIRRO
    const [isDisabledAddressCity,setIsDisabledAddressCity] = useState(true) // DESATIVA - CIDADE
    const [isDisabledAddressState,setIsDisabledAddressState] = useState(true) // DESATIVA - ESTADO
    const [isDisabledAddressUf,setIsDisabledAddressUf] = useState(true) // DESATIVA - UF
    const [isDisabledAddressRegion,setIsDisabledAddressRegion] = useState(true) // DESATIVA - REGIÃO
    const [btnHourSales,setBtnHourSales] = useState("DESATIVADO") // DESATIVA BOTÃO DE COLETA DE HORA
    const [eventCursorHourSales,setEventCursorHourSales] = useState("none") // DESATIVA EVENTOS DE HORA
    const [btnStatusSales,setBtnStatusSales] = useState("DESATIVADO") // DESATIVA BOTÃO DE COLETA DE STATUS
    const [eventCursorStatusSales,setEventCursorStatusSales] = useState("none") // DESATIVA EVENTOS DE STATUS
    // BOTÃO - DELETAR DA LISTA DE VENDAS
    const [isDisabledDelSales,setIsDisabledDelSales] = useState(false) // DESATIVA BOTÃO DELETE DE VENDAS
    const [isCursorDelSales,setIsCursorDelSales] = useState("pointer") // DESATIVA CURSOR DELETE DE VENDAS
    const [eventDelSales,setEventDelSales] = useState("fill") // DESATIVA EVENTOS DO BOTÃO DELETE DE VENDAS

    const [eventBtnCep,setEventBtnCep] = useState("none") // DESATIVA EVENTOS DO BOTÃO BUSCA DE CEP

    const [colorTypeCard,setColorTypeCard] = useState("") // COR DO TEXTO DO TIPO DE CARTÃO
    const [colorFlagCard,setColorFlagCard] = useState("") // COR DO TEXTO DA BANDEIRA DO CARTÃO

    const [indexGet,setIndexGet] = useState(0)
    const refRegisterSale = useRef(null)
    const [typePaymentMoney,setTypePaymentMoney] = useState("") // RADIO BUTTON - TIPO DE PAGAMENTO  - MONEY
    const [indexTypePaymentMoney,setIndexTypePaymentMoney] = useState(1) // ÍNDICE DE CONTROLE DE PAGAMENTO - MONEY
    const [typePaymentCardR,setTypePaymentCardR] = useState("") // RADIO BUTTON - TIPO DE PAGAMENTO  - CARD
    const [indexTypePaymentCard,setIndexTypePaymentCard] = useState(1) // ÍNDICE DE CONTROLE DE PAGAMENTO - CARD
    const [typePaymentPix,setTypePaymentPix] = useState("") // RADIO BUTTON - TIPO DE PAGAMENTO  - PIX
    const [indexTypePaymentPix,setIndexTypePaymentPix] = useState(1) // ÍNDICE DE CONTROLE DE PAGAMENTO - PIX
    const [controlCartSale,setControlCartSale] = useState("")

    const [btnNewSale,setBtnNewSale] = useState(false)
    const [btnCancelSale,setBtnCancelSale] = useState(true)
    const [btnSaveSale,setBtnSaveSale] = useState(true)
    const [btnInvoiceSale,setBtnInvoiceSale] = useState(true)
    const [colorNewSales, setColorNewSales] = useState("#0044ffcb")
    const [colorCancelSales, setColorCancelSales] = useState("#0044ff96")
    const [colorSaveSales, setColorSaveSales] = useState("#0044ff96")
    const [colorInvoiceSales, setColorInvoiceSales] = useState("#0044ff96")
    const [cursorNewSales, setCursorNewSales] = useState("pointer")
    const [cursorCancelSales, setCursorCancelSales] = useState("default")
    const [cursorSaveSales, setCursorSaveSales] = useState("default")
    const [cursorInvoiceSales, setCursorInvoiceSales] = useState("default")

    const [isOpen,setIsOpen] = useState(false) // MODAL - NOTA FISCAL DA VENDA

    const [loadPaymentRel,setLoadPaymentRel] = useState("")
    const [loadAmountRel,setLoadAmountRel] = useState("")
    const [loadPaymentTypeRel,setLoadPaymentTypeRel] = useState("")
    const [loadAmountUnitRel,setLoadAmountUnityRel] = useState("")
    const [unitRelList,setUnityRelList] = useState([])

    const openModalRel = () => {
        setIsOpen(true)
    }

    const closeModalRel = () => {
        setIsOpen(false)
    }

    // INÍCIO - VALIDAÇÃO DE INPUT DE ID E REGISTRO DE VENDA
    const validDigitsId = (textDigitedId) => {
        return textDigitedId.replace(/[^0-9]/g, "")
    }

    const ChangeMaskIdSale = (e) => {
    const updateTextDigitedId = validDigitsId(e.target.value)
    setIdSale(updateTextDigitedId)
    }

    const ChangeMaskRegisterSale = (e) => {
    const updateTextDigitedId = validDigitsId(e.target.value)
    setRegisterSaleCommand(updateTextDigitedId)
    }
   // FIM - VALIDAÇÃO DE ID

    // FUNÇÕES - TIPOS DE PAGAMENTOS
    const changeTypePaymentMoney = (e) => { // FUNÇÃO - DINHEIRO
        if (indexTypePaymentMoney === 1){
            setTypePaymentMoney("ATIVADO")
            setIndexTypePaymentMoney(2)

            setTypePaymentCardR("DESATIVADO")
            setTypePaymentPix("DESATIVADO")
        } 
        else if (indexTypePaymentMoney === 2){
            setTypePaymentMoney("DESATIVADO")
            setIndexTypePaymentMoney(1)
        }    
        
    }

    const changeTypePaymentCard= (e) => { // FUNÇÃO - CARTÂO
        if (indexTypePaymentCard === 1){
            setTypePaymentCardR("ATIVADO")
            setIndexTypePaymentCard(2)

            setTypePaymentMoney("DESATIVADO")
            setTypePaymentPix("DESATIVADO")
        } 
        else if (indexTypePaymentCard === 2){
            setTypePaymentCardR("DESATIVADO")
            setIndexTypePaymentCard(1)
        }    
    }

    const changeTypePaymentPix= (e) => { // FUNÇÃO - PIX
        if (indexTypePaymentPix === 1){
            setTypePaymentPix("ATIVADO")
            setIndexTypePaymentPix(2)

            setTypePaymentMoney("DESATIVADO")
            setTypePaymentCardR("DESATIVADO")
        } 
        else if (indexTypePaymentPix === 2){
            setTypePaymentPix("DESATIVADO")
            setIndexTypePaymentPix(1)
        }    
    }
    // FIM - FUNÇÕES - TIPOS DE PAGAMENTOS

    const checkValue = (valueSale) => {
        const decimalPart = valueSale.toString().split(".")[1] || ''
        const numberDecimal = decimalPart.length
        if (numberDecimal === 1)
        return numberDecimal + "0"    
      }

      const getRegisterSales = async (e) => {
        const response = await fetch(`http://localhost:3000/commands?idCommand=${registerSaleCommand}`)
            const dataResponse = await response.json()
            if (dataResponse.length === 0){
                swal({
                  icon: "error",
                  title: "REI DOS LANCHES",
                  text: "O registro da comanda não consta no sistema!"
                })}
                else {
                 if (idSale !== "") {
                    if (registerSaleCommand !== ""){
                        setIndexGet(1)
                        setRegisterSaleCommand(refRegisterSale.current.value)
                        getCommandsInSales(urlCommand,registerSaleCommand)
                        setIsDisabledRegister(true)
                        setIsDisabledBtnItems(true)
                        setIsDisabledCursorBtnItems("none")
                        setControlMapCart(true)    
                        setControlCartSale("LOAD")    
                        setUnityRelList(dataResponse)     
                    }
                    else {
                        swal({
                             icon: "error",
                             title: "INFORMAÇÕES DE VENDA",
                             text: "É preciso preencher informar o registro da comanda!"
                             })
                    }
                 }   
                 else{
                    swal({
                        icon: "error",
                        title: "INFORMAÇÕES DE VENDA",
                         text: "É preciso preencher informar o ID da venda!"
                        })
                 }
                }
      }

      useEffect(() => {
        commandSale && commandSale?.map((saleList) => {
            setConsumptionSaleCommand(saleList.typeConsumption) // CONSUMO DA COMANDA
            setTableCommandSale(saleList.tableCommand)
            setValueSale(saleList.totalAmount)   
            //console.log("consumo: " + saleList.typeConsumption)  

            if (saleList.typeConsumption === "LOCAL") {
                setDeliveryAddressCep("17065-209")
                setDeliveryAddressRoad("RUA FRANCISCO RAIMUNDO DE CARVALHO")
                setDeliveryAddressNumber("5-62")
                setDeliveryAddressHood("NOVA ESPERANÇA")
                setDeliveryAddressCity("BAURU")
                setDeliveryAddressState("SÃO PAULO")
                setDeliveryAddressUf("SP")
                setDeliveryAddressRegion("SUDESTE")
                setIsDisabledAddressCep(true)
                setIsDisabledAddressRoad(true)
                setIsDisabledAddressNumber(true)
                setIsDisabledAddressHood(true)
                setIsDisabledAddressCity(true)
                setIsDisabledAddressState(true)
                setIsDisabledAddressUf(true)
                setIsDisabledAddressRegion(true)
                setIsDisabledBtnCep(true)
                setIsDisabledCursorBtnCep("default")
                setEventBtnCep("none")
                setBtnSaveSale(false)
                setColorSaveSales(optionsSales[0])
                setCursorSaveSales(optionsSales[2])
                setIsDisabledPaymentAll("all")     
                 }
            else if (saleList.typeConsumption === "DELIVERY") {
                setDeliveryAddressCep("")
                setDeliveryAddressRoad("")
                setDeliveryAddressNumber("")
                setDeliveryAddressHood("")
                setDeliveryAddressCity("")
                setDeliveryAddressState("")
                setDeliveryAddressUf("")
                setDeliveryAddressRegion("")
                setIsDisabledAddressCep(false)
                setIsDisabledAddressRoad(false)
                setIsDisabledAddressNumber(false)
                setIsDisabledAddressHood(false)
                setIsDisabledAddressCity(false)
                setIsDisabledAddressState(false)
                setIsDisabledAddressUf(false)
                setIsDisabledAddressRegion(false)
                setIsDisabledBtnCep(false)
                setIsDisabledCursorBtnCep("pointer")
                setEventBtnCep("fill")
                 }    
        })
      },[commandSale])

      const getCep = async (cep) => { // BUSCAR CEP NO SITE: VIACEP
        const requestCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const responseCep = await requestCep.json()
        if (responseCep.length !== 0 ) {
            console.log("tem cep sim")
            console.log(responseCep)
            setDeliveryAddressRoad(responseCep.logradouro) // SETANDO O LOGRADOURO...
            setDeliveryAddressNumber(responseCep.complemento) // SETANDO O NÚMERO
            setDeliveryAddressHood(responseCep.bairro) // SETANDO O BAIRRO 
            setDeliveryAddressCity(responseCep.localidade) // SETANDO A CIDADE
            setDeliveryAddressState(responseCep.estado) // SETANDO O ESTADO
            setDeliveryAddressUf(responseCep.uf) // SETANDO O UF 
            setDeliveryAddressRegion(responseCep.regiao) // SETANDO A REGIÃO
            setBtnSaveSale(false)
            setColorSaveSales(optionsSales[0])
            setCursorSaveSales(optionsSales[2])
            setIsDisabledPaymentAll("all")     
        }
        else if (responseCep.length === 0 ) {
            swal({
               closeOnClickOutside: false,
               icon: "success",
               title: "REI DOS LANCHES",
               text: "Cep não consta cadastrado no sistema!"
                })  
        }
      }

      const calcMoney = () => {
          const resChangeSale = inputValueSale - valueSale
          const resFinally = Number(resChangeSale)
          setChangeValueSale(resFinally.toFixed(2))
      }

      useEffect(() => { // CALCULO DE TROCO...
        calcMoney()
      },[inputValueSale])

      const changeMethodPayment = (valuePayment) => { // LIMPA MÉTODOS DE PAGAMENTO CONFORME ESCOLHA
        setPaymentMethod(valuePayment)
        if (valuePayment === "DINHEIRO") {
            setTypePaymentCard("NULO") // LIMPA CARTÃO
            setCardFlag("NULO") // LIMPA CARTÃO
            setCardName("NULO") // LIMPA CARTÃO 
            setCardNumber(0) // LIMPA CARTÃO
            setCpfCnpjHolder(0) // LIMPA CARTÃO 
            setExpirationDateCard("00/00") // LIMPA CARTÃO
            setCvcCwCard(0) // LIMPA CARTÃO
            setColorTypeCard("") // LIMPA CARTÃO
            setColorFlagCard("") // LIMPA CARTÃO
            setLoadPaymentTypeRel("DINHEIRO")
            setBtnHourSales("ATIVADO")
            setEventCursorHourSales(optionsSales[4])
        }
        else if (valuePayment === "CARTÃO") {
            setInputValueSale(0) // LIMPA DINHEIRO
            setChangeValueSale(0) // LIMPA DINHEIRO
            setLoadPaymentTypeRel("CARTÃO DE ")
            setBtnHourSales("ATIVADO")
            setEventCursorHourSales(optionsSales[4])
        }
        else if (valuePayment === "PIX") {
            setInputValueSale(0) // LIMPA DINHEIRO
            setChangeValueSale(0) // LIMPA DINHEIRO
            setTypePaymentCard("NULO") // LIMPA CARTÃO
            setCardFlag("NULO") // LIMPA CARTÃO
            setCardName("NULO") // LIMPA CARTÃO 
            setCardNumber(0) // LIMPA CARTÃO
            setCpfCnpjHolder(0) // LIMPA CARTÃO 
            setExpirationDateCard("00/00") // LIMPA CARTÃO
            setCvcCwCard(0) // LIMPA CARTÃO
            setColorTypeCard("") // LIMPA CARTÃ
            setColorFlagCard("") // LIMPA CARTÃ
            setLoadPaymentTypeRel("PIX")
            setBtnHourSales("ATIVADO")
            setEventCursorHourSales(optionsSales[4])
        }
      }

      const changeTypeCard = (e) => { // COLETA DE VALORES - TIPO DE CARTÃO
        setTypePaymentCard(e.target.value)
        if (e.target.value === "CRÉDITO") {
            setColorTypeCard("COLOR_CRÉDITO")
            setLoadPaymentRel("CRÉDITO")
        }
        else if (e.target.value === "DÉBITO") {
            setColorTypeCard("COLOR_DÉBITO")
            setLoadPaymentRel("DÉBITO")
        }
      }

      const changeFlagCard = (e) => { // COLETA DE VALORES - BANDEIRA DO CARTÃO
        setCardFlag(e.target.value)
        if (e.target.value === "VISA") {
            setColorFlagCard("COLOR_VISA")
        }
        else if (e.target.value === "MASTERCARD") {
            setColorFlagCard("COLOR_MASTERCARD")
        }
        else if (e.target.value === "NUBANK") {
            setColorFlagCard("COLOR_NUBANK")
        }
        else if (e.target.value === "DISCOVER") {
            setColorFlagCard("COLOR_DISCOVER")
        }
      }

      useEffect(() => { // COLETA DE VALOR DE QRCODE - PIX
        setQrCodePisSale(valueSale)
      },[valueSale])

      // COLETA DE DATA E HORA DO SISTEMA - VENDA
        const dateHourSystemSale = new Date()
        const dateSale = dateHourSystemSale.toLocaleDateString()
        const hourSystemSale = dateHourSystemSale.toLocaleTimeString()
        const handleHourSystemCommand = () => {
         setHourSale(hourSystemSale)
         setBtnStatusSales("ATIVADO")
         setEventCursorStatusSales(optionsSales[4])
        }

      // TROCA DE STATUS DA VENDA
         const changeColorStatusSale = () => {
           if (paymentStatus === "PENDENTE"){
               setBtnInvoiceSale(false) 
               setCursorInvoiceSales("pointer")
               setColorInvoiceSales(optionsSales[0])
               setPaymentStatus("FINALIZADO")
           }
           else if (paymentStatus === "FINALIZADO")
           {
               setCursorInvoiceSales("default")
               setBtnInvoiceSale(true) 
               setColorInvoiceSales(optionsSales[1])
               setPaymentStatus("PENDENTE")
           }
         } // ************************************

         const addItemCartSale = (idItem,descItem,photoItem,amountItem,valueSaleItem) => {
            const newCarSale = {
                "idItemCartSale": idItem,
                "descItemCartSale": descItem,
                "photoItemCartSale": photoItem,
                "amountItemCartSale": amountItem,
                "valueSaleItemCartSale": valueSaleItem
            }
                setItemsSale(prevItems => [...prevItems,newCarSale])
                swal({
                    closeOnClickOutside: false,
                    icon: "success",
                    title: "REI DOS LANCHES",
                    text: "O ítem foi confirmado na venda!"
                    })  
         }

         //***************************BOTÕES DE AÇÃO********************************* */
         // 0 - ATIVO, 1 - INATIVO, 2 - CURSOR PONTEIRO, 3 - CURSOR PADRÃO, 4 - ELEMENTO ATIVADO
         // 5 - ELEMENTO DESATIVADO
         // 0- SEM OPERAÇÃO 1-NOVO 2-ALTERAR 3-DELETAR 4-CANCELAR 5-SALVAR

         const [indexOpSales, setIndexOpSales] = useState(0) 
         const optionsSales = ["#0044ffcb","#0044ff96","pointer","default","fill","none"]

         const handleClickNewSale = (e) => { // BOTÃO - NOVA VENDA**
            if (btnNewSale === false) {
               setIndexOpSales(1) // operação nova venda
               setBtnNewSale(true)
               setBtnCancelSale(false)
               setBtnInvoiceSale(true)

               setColorNewSales(optionsSales[1]) 
               setColorCancelSales(optionsSales[0])
               setColorInvoiceSales(optionsSales[1])

               setCursorNewSales(optionsSales[3])
               setCursorCancelSales(optionsSales[2])
               setCursorInvoiceSales(optionsSales[3])

               setIsDisabledIdSales(false) 
               setIsDisabledRegister(false)
               setIsDisabledBtnItems(false)
               setIsDisabledCursorBtnItems("pointer")

               setBtnHourSales("DESATIVADO")
               setEventCursorHourSales(optionsSales[5])
               setBtnStatusSales("DESATIVADO")
               setEventCursorStatusSales(optionsSales[5])

               setIsDisabledDelSales(true)
               setIsCursorDelSales(optionsSales[3]) 
               setEventDelSales(optionsSales[5])     
            }
         }

         const handleClickCancelSale = (e) => { // BOTÃO - CANCELAR VENDA** 
            swal("Deseja realmente cancelar o cadastro ou alteração da venda?", {
                closeOnClickOutside: false,
                dangerMode: true,
                closeOnEsc: false,
                icon: "warning",
                title: "REI DOS LANCHES",
                buttons: {
                  confirmar: {
                  text: "Sim",
                  value: "sim",
                  className: "swal-cancelar-sim",
                  },
                  cancelar: {
                     text: "Não",
                     value: "nao",
                     className: "swal-cancelar-nao"
                     },
                    },
                    })
                    .then((value => {
                     if (value === "sim") { 
                        if (btnCancelSale === false) {
                            setIndexOpSales(0) // cancelando a venda
                            setBtnNewSale(false)
                            setBtnCancelSale(true)
                            setBtnSaveSale(true)
                            setBtnInvoiceSale(true)

                            setColorNewSales(optionsSales[0]) 
                            setColorCancelSales(optionsSales[1])
                            setColorSaveSales(optionsSales[1])
                            setColorInvoiceSales(optionsSales[1])

                            setCursorNewSales(optionsSales[2])
                            setCursorCancelSales(optionsSales[3])
                            setCursorSaveSales(optionsSales[3])
                            setCursorInvoiceSales(optionsSales[3])
                            
                            setIdSale("")
                            setIsDisabledIdSales(true) 
                            setRegisterSaleCommand("")
                            setIsDisabledRegister(true)
                            setIsDisabledBtnItems(true)
                            setIsDisabledCursorBtnItems("default")
                            setConsumptionSaleCommand("")
                            setTableCommandSale("")

                            setItemsSale([]) // LIMPA O CARRINHO...
                            setControlMapCart(false) // DESATIVA A RENDERIZAÇÃO DO CARRINHO...

                            setDeliveryAddressCep("")
                            setDeliveryAddressRoad("")
                            setDeliveryAddressNumber("")
                            setDeliveryAddressHood("")
                            setDeliveryAddressCity("")
                            setDeliveryAddressState("")
                            setDeliveryAddressUf("")
                            setDeliveryAddressRegion("")
                            setIsDisabledAddressCep(true)
                            setIsDisabledAddressRoad(true)
                            setIsDisabledAddressNumber(true)
                            setIsDisabledAddressHood(true)
                            setIsDisabledAddressCity(true)
                            setIsDisabledAddressState(true)
                            setIsDisabledAddressUf(true)
                            setIsDisabledAddressRegion(true)
                            setIsDisabledBtnCep(true)
                            setIsDisabledCursorBtnCep("default")
                            setEventBtnCep("none")

                            setIsDisabledPaymentAll("none") // DESATIVA AS DIVS DE PAGAMENTO
                            setTypePaymentMoney("DESATIVADO")
                            setTypePaymentCardR("DESATIVADO")
                            setTypePaymentPix("DESATIVADO")
                            setInputValueSale("") // LIMPA DINHEIRO
                            setChangeValueSale("") // LIMPA DINHEIRO
                            setTypePaymentCard("") // LIMPA CARTÃO
                            setCardFlag("") // LIMPA CARTÃO
                            setCardName("") // LIMPA CARTÃO E PIX
                            setCardNumber("") // LIMPA CARTÃO
                            setCpfCnpjHolder("") // LIMPA CARTÃO E PIX
                            setExpirationDateCard("") // LIMPA CARTÃO
                            setCvcCwCard("") // LIMPA CARTÃO
                            setColorTypeCard("") // LIMPA CARTÃO
                            setColorFlagCard("") // LIMPA CARTÃO
                            setQrCodePisSale(0) // LIMPA O QRCODE
                            setValueSale(0) // LIMPA TODOS OS CAMPOS DE TOTAL DA VENDA*

                            setBtnHourSales("DESATIVADO")
                            setEventCursorHourSales(optionsSales[5])
                            setHourSale("")
                            setBtnStatusSales("DESATIVADO")
                            setEventCursorStatusSales(optionsSales[5])    
                            setPaymentStatus("PENDENTE")

                            setIsDisabledDelSales(false)
                            setIsCursorDelSales(optionsSales[2]) 
                            setEventDelSales(optionsSales[4])  

                            getRefreshRegister(url)
                        }
                     }}))
         }

         const handleClickSaveSale = async (e) => { // BOTÃO - SALVAR VENDA
            if (paymentMethod === "") {
                    swal({
                    icon: "warning",
                    title: "INFORMAÇÕES DE PAGAMENTO",
                    text: "É preciso selecionar uma forma de pagamento para finalizar a venda!"
                    })   
            }
            else if (paymentMethod === "DINHEIRO") {
                if (inputValueSale === "" || changeValueSale === "") {
                        swal({
                        icon: "warning",
                        title: "INFORMAÇÕES DE PAGAMENTO EM DINHEIRO",
                        text: "Existe(m) campo(s) de pagamento em dinheiro a ser(em) preenchido(s)!"
                        })   
                    }
                    else {
                        if (hourSale === "") {
                        swal({
                        icon: "warning",
                        title: "INFORMAÇÕES DE SISTEMA",
                        text: "Por favor preencha o campo com a hora do sistema!"
                        }) 
                     }    
                     else {
                         loadSaveSales()
                        }
                    }
            }
            else if (paymentMethod === "CARTÃO") {
                    if (typePaymentCard === "" || cardFlag === "" || cardName === "" || cardNumber === "" || cpfCnpjHolder === "" || expirationDateCard === "" || cvcCwCard === "") {
                        swal({
                        icon: "warning",
                        title: "INFORMAÇÕES DE PAGAMENTO EM CARTÃO",
                        text: "Existe(m) campo(s) de pagamento em cartão a ser(em) preenchido(s)!"
                        })   
                    }
                    else {
                        if (hourSale === "") {
                        swal({
                        icon: "warning",
                        title: "INFORMAÇÕES DE SISTEMA",
                        text: "Por favor preencha o campo com a hora do sistema!"
                        }) 
                     } 
                     else {
                         loadSaveSales()
                     }   
                    }
            }
            else if (paymentMethod === "PIX") {
                if (hourSale === "") {
                        swal({
                        icon: "warning",
                        title: "INFORMAÇÕES DE SISTEMA",
                        text: "Por favor preencha o campo com a hora do sistema!"
                        }) 
                     }  
                     else {
                         loadSaveSales()
                     }  
            }                   
         }

         const loadSaveSales = async (e) => { // INCLUSÃO DE VENDAS
            if (indexOpSales === 1) { 
                    const response = await fetch(`http://localhost:3000/sales?idSale=${idSale}`)
                    const dataResponse = await response.json()
                    if (dataResponse.length !== 0){
                        swal({
                         icon: "error",
                         title: "REI DOS LANCHES",
                         text: "O Id da venda já existe no sistema!"
                            })
                     } 
                     if (dataResponse.length === 0){
                        swal("Confirma a efetivação da venda?", {
                            closeOnClickOutside: false,
                            dangerMode: true,
                            closeOnEsc: false,
                            icon: "warning",
                            title: "REI DOS LANCHES",
                            buttons: {
                            confirmar: {
                            text: "Sim",
                            value: "sim",
                            className: "swal-cancelar-sim",
                              },
                            cancelar: {
                            text: "Não",
                            value: "nao",
                            className: "swal-cancelar-nao"
                             },
                             },
                         })
                         .then((value => {
                        if (value === "sim") {
                            // ***LÓGICA PARA CONFIRMAÇÃO DO CADASTRO DA VENDA***
                              const objSales= {
                                idSale,   // ID
		                        registerSaleCommand, // REGISTRO DE VENDA
		                        consumptionSaleCommand, // CONSUMO DA COMANDA
		                        tableCommandSale, // MESA DA COMANDA
		                        deliveryAddressCep, // CEP
		                        deliveryAddressRoad, // LOGRADOURO
		                        deliveryAddressNumber, // NÚMERO
		                        deliveryAddressHood, // BAIRRO
		                        deliveryAddressCity, // CIDADE
		                        deliveryAddressState, // ESTADO
		                        deliveryAddressUf, // UF
		                        deliveryAddressRegion, // REGIÃO
		                        itemsSale, // ITÉNS DA COMANDA DE VENDA
		                        valueSale, // VALOR TOTAL DA VENDA
		                        paymentMethod, // MÉTODO DE PAGAMENTO	
		                        inputValueSale, // VALOR DE ENTRADA - DINHEIRO
		                        changeValueSale, // TROCO - DINHEIRO
		                        typePaymentCard, // TIPO DE CARTÃO - CRÉDITO OU DÉBITO
		                        cardNumber, // NÚMERO DO CARTÃO
		                        cardFlag, // BANDEIRA DO CARTÃO
		                        expirationDateCard, // DATA DE VALIDADE DO CARTÃO
		                        cvcCwCard, // CÓDIGO DE SEGURANÇA
		                        cardName, // NOME DO CARTÃO
		                        cpfCnpjHolder, // CPF/CNPJ DO CARTÃO	
		                        qrCodePisSale,	// QRCODE - PIS
		                        dateSale, // DATA DA VENDA
		                        hourSale, // HORA DA VENDA
		                        paymentStatus // SITUAÇÃO DA VENDA
                               }
                               httpConfig(objSales, "POST")
                               setIndexOpSales(0)
                               swal({
                                 icon: "success",
                                 title: "REI DOS LANCHES",
                                 text: "Venda efetivada com sucesso!"
                                 })
                                 if (btnSaveSale === false){
                                    setIndexOpSales(0) 
                                    setBtnNewSale(false)
                                    setBtnCancelSale(true)
                                    setBtnSaveSale(true)
                                    setBtnInvoiceSale(true)

                                    setColorNewSales(optionsSales[0]) 
                                    setColorCancelSales(optionsSales[1])
                                    setColorSaveSales(optionsSales[1])
                                    setColorInvoiceSales(optionsSales[1])

                                    setCursorNewSales(optionsSales[2])
                                    setCursorCancelSales(optionsSales[3])
                                    setCursorSaveSales(optionsSales[3])
                                    setCursorInvoiceSales(optionsSales[3])

                                    setIdSale("")
                                    setIsDisabledIdSales(true) 
                                    setRegisterSaleCommand("")
                                    setIsDisabledRegister(true)
                                    setIsDisabledBtnItems(true)
                                    setIsDisabledCursorBtnItems("default")
                                    setConsumptionSaleCommand("")
                                    setTableCommandSale("")

                                    setItemsSale([]) // LIMPA O CARRINHO...
                                    setControlMapCart(false) // DESATIVA A RENDERIZAÇÃO DO CARRINHO...

                                    setDeliveryAddressCep("")
                                    setDeliveryAddressRoad("")
                                    setDeliveryAddressNumber("")
                                    setDeliveryAddressHood("")
                                    setDeliveryAddressCity("")
                                    setDeliveryAddressState("")
                                    setDeliveryAddressUf("")
                                    setDeliveryAddressRegion("")
                                    setIsDisabledAddressCep(true)
                                    setIsDisabledAddressRoad(true)
                                    setIsDisabledAddressNumber(true)
                                    setIsDisabledAddressHood(true)
                                    setIsDisabledAddressCity(true)
                                    setIsDisabledAddressState(true)
                                    setIsDisabledAddressUf(true)
                                    setIsDisabledAddressRegion(true)
                                    setIsDisabledBtnCep(true)
                                    setIsDisabledCursorBtnCep("default")
                                    setEventBtnCep("none")

                                    setIsDisabledPaymentAll("none") // DESATIVA AS DIVS DE PAGAMENTO
                                    setTypePaymentMoney("DESATIVADO")
                                    setTypePaymentCardR("DESATIVADO")
                                    setTypePaymentPix("DESATIVADO")
                                    setInputValueSale("") // LIMPA DINHEIRO
                                    setChangeValueSale("") // LIMPA DINHEIRO
                                    setTypePaymentCard("") // LIMPA CARTÃO
                                    setCardFlag("") // LIMPA CARTÃO
                                    setCardName("") // LIMPA CARTÃO E PIX
                                    setCardNumber("") // LIMPA CARTÃO
                                    setCpfCnpjHolder("") // LIMPA CARTÃO E PIX
                                    setExpirationDateCard("") // LIMPA CARTÃO
                                    setCvcCwCard("") // LIMPA CARTÃO
                                    setColorTypeCard("") // LIMPA CARTÃO
                                    setColorFlagCard("") // LIMPA CARTÃO
                                    setQrCodePisSale(0) // LIMPA O QRCODE
                                    setValueSale(0) // LIMPA TODOS OS CAMPOS DE TOTAL DA VENDA*

                                    setBtnHourSales("DESATIVADO")
                                    setEventCursorHourSales(optionsSales[5])
                                    setHourSale("")
                                    setBtnStatusSales("DESATIVADO")
                                    setEventCursorStatusSales(optionsSales[5])    
                                    setPaymentStatus("PENDENTE")

                                    setIsDisabledDelSales(false)
                                    setIsCursorDelSales(optionsSales[2]) 
                                    setEventDelSales(optionsSales[4])  
                                    }
                }
                }))}
            }
         }

         const handleClickDeleteSale = async (idDelSale) => { // BOTÃO - DELETAR VENDA
            swal("Deseja realmente deletar o registro de venda?", {
                closeOnClickOutside: false,
                dangerMode: true,
                closeOnEsc: false,
                icon: "warning",
                title: "REI DOS LANCHES",
                buttons: {
                confirmar: {
                    text: "Sim",
                    value: "sim",
                    className: "swal-cancelar-sim",
                },
                cancelar: {
                    text: "Não",
                    value: "nao",
                    className: "swal-cancelar-nao"
                },
          
                },
            })
            .then((value => {
                if (value === "sim") {
                    delRegister(url+"/"+idDelSale,idDelSale)
                    swal({
                    icon: "success",
                    title: "REI DOS LANCHES",
                    text: "Registro de venda deletado com sucesso!"
                    })  
                     }
                    }))   
            }

            useEffect(() => {
                commandSale && commandSale?.map(saleCom => {
                    setLoadAmountRel(saleCom.totalAmount)
                })
                unitRelList && unitRelList?.map(itemRel => {
                setLoadAmountUnityRel(itemRel.item.length)
                })
            },[commandSale])

  return (

    <div className="container-sales">
        
        <h2>VENDAS</h2>

        <form className="form-register-sales">

            <div className="input-initial-sales"> 
                <label>
                    <span>ID: </span>
                    <input type="text" style={{width:"80px",textAlign:"center"}}
                    id="id-id-sale"
                    name="n-id-sale"
                    value={idSale}
                    onChange={(e) => ChangeMaskIdSale(e)}
                    disabled={isDisabledIdSales}
                    required
                    />
                </label>

                <label className="label-register">
                    <span>REGISTRO: </span>
                    <input type="text" style={{width:"100px",textAlign:"center"}}
                    id="id-register-sale"
                    name="n-register-sale"
                    value={registerSaleCommand}
                    onChange={(e) => ChangeMaskRegisterSale(e)}
                    ref={refRegisterSale}
                    disabled={isDisabledRegister}
                    required
                    />
                    <button type="button" disabled={isDisabledBtnItems} style={{cursor:isDisabledCursorBtnItems}} className="button-search-register-sales" onClick={getRegisterSales}><BiSolidSearch className="icon-button-search-command"/></button>
                </label>

               
                <label>
                    <span>CONSUMO: </span>
                    <input type="text" style={{width:"150px",textAlign:"center"}} 
                    id="id-consumption-sale"
                    name="n-consumption-sale"
                    value={consumptionSaleCommand}
                    disabled={true}
                    required
                    />
                </label>
 
                <label>
                    <span>MESA: </span>
                    <input type="text" style={{width:"80px",textAlign:"center"}}
                    id="id-table-sale"
                    name="n-table-sale"
                    value={tableCommandSale}
                    disabled={true}
                    required
                    />
                </label>
            </div>

            {/* -------------------COMMAND ITEMS--------------------- */}
            <div className="command-items-sales">
                <div className="title-commmand-items-sales">
                    <p><ImCart className="icon-items-command-sales"/> PRODUTOS DA COMANDA</p>
                </div>
                <div className="items-command-sales">
                    
                    <ul className="list-items-sales">
                        {controlMapCart === true  ? commandSale?.map(itemS => (       

                            <li key={itemS.id}>
                            {itemS && itemS.item?.map((itemSS) => (
                            <div className="sub-list-sales" key={itemSS.idItemCart}>
                                <img src={itemSS.photoItemCart} alt="" />
                                <div className="sub-items-cart-finally">
                                    <p>{itemSS.descItemCart}</p>
                                    <p>x {itemSS.amountItemCart}</p>
                                     <p style={{color:"red", textShadow: ".2px .2px 7px white"}}>R$ {checkValue(itemSS.valueSaleItemCart) ? itemSS.valueSaleItemCart + "0" : itemSS.valueSaleItemCart}</p>
                                      <button type="button" className="btnConfirm-product" onClick={() => addItemCartSale(itemSS.idItemCart,itemSS.descItemCart,itemSS.photoItemCart,itemSS.amountItemCart,itemSS.valueSaleItemCart)}><BsDatabaseFillAdd  className="icon-btnConfirm-product"/>CONFIRMAR</button>
                                </div>
                            </div>
                            ))}
                        </li>                    
                        )) : ""}
                    </ul>  
                </div>
            </div>
            {/* ------------------------------------------------------ */}
            <div className="data-address-sales">
                <div className="title-data-address-sales">
                    <p><FaAddressCard className="icon-address-sales"/> DADOS DE ENDEREÇO</p>
                </div>
                
                <div className="address-initial">
                    <label>
                        <span>CEP: </span>
                        <input type="text" style={{width:"110px",textAlign:"center"}}
                        id="id-cep-address"
                        name="n-cep-address"
                        value={deliveryAddressCep}
                        onChange={(e) => setDeliveryAddressCep(e.target.value)}
                        disabled={isDisabledAddressCep}
                        required
                        />
                        <button type="button" className="btn-search-cep" onClick={() => getCep(deliveryAddressCep)} style={{cursor:isDisabledCursorBtnCep,pointerEvents:eventBtnCep}} disabled={isDisabledBtnCep}><SiCeph className="icon-btn-cep"/></button>
                    </label>
                    <label>
                        <span>LOGRADOURO: </span>
                        <input type="text" style={{width:"390px",textAlign:"center"}}
                        id="id-road-address"
                        name="n-road-address"
                        value={deliveryAddressRoad}
                        onChange={(e) => setDeliveryAddressRoad(e.target.value)}
                        disabled={isDisabledAddressRoad}
                        required
                        />
                    </label>
                    <label>
                        <span>NÚMERO: </span>
                        <input type="text" style={{width:"160px",textAlign:"center"}}
                        id="id-number-address"
                        name="n-number-address"
                        value={deliveryAddressNumber}
                        onChange={(e) => setDeliveryAddressNumber(e.target.value)}
                        disabled={isDisabledAddressNumber}
                        required
                        />
                    </label>
                </div>

                <div className="address-finally">
                    <label>
                        <span>BAIRRO </span>
                        <input type="text" style={{width:"220px",textAlign:"center"}}
                        id="id-hood-address"
                        name="n-hood-address"
                        value={deliveryAddressHood}
                        onChange={(e) => setDeliveryAddressHood(e.target.value)}
                        disabled={isDisabledAddressHood}
                        required
                        />
                    </label>
                    <label>
                        <span>CIDADE </span>
                        <input type="text" style={{width:"250px",textAlign:"center"}}
                        id="id-city-address"
                        name="n-city-address"
                        value={deliveryAddressCity}
                        onChange={(e) => setDeliveryAddressCity(e.target.value)}
                        disabled={isDisabledAddressCity}
                        required
                        />
                    </label>
                    <label>
                        <span>ESTADO </span>
                        <input type="text" style={{width:"150px",textAlign:"center"}}
                        id="id-state-address"
                        name="n-state-address"
                        value={deliveryAddressState}
                        onChange={(e) => setDeliveryAddressState(e.target.value)}
                        disabled={isDisabledAddressState}
                        required
                        />
                    </label>
                    <label>
                        <span>UF </span>
                        <input type="text" style={{width:"70px",textAlign:"center"}}
                        id="id-uf-address"
                        name="n-uf-address"
                        value={deliveryAddressUf}
                        onChange={(e) => setDeliveryAddressUf(e.target.value)}
                        disabled={isDisabledAddressUf}
                        required
                        />
                    </label>
                    <label>
                        <span>REGIÃO </span>
                        <input type="text" style={{width:"130px",textAlign:"center"}}
                        id="id-region-address"
                        name="n-region-address"
                        value={deliveryAddressRegion}
                        onChange={(e) => setDeliveryAddressRegion(e.target.value)}
                        disabled={isDisabledAddressRegion}
                        required
                        />
                    </label>
                </div>
            </div> {/* ------------------------------------------------------ */}

            <div className="data-invoicing-sales" style={{pointerEvents:isDisabledPaymentAll}}>
                <div className="title-data-invoicing-sales">
                    <p><FaMoneyBillWave className="icon-invoicing-sales"/> DADOS DE FATURAMENTO</p>
                </div>

                <div className="data-payment-sales"> {/* PAGAMENTOS */}

                    <div className="click-type-payment" onClick={() => changeMethodPayment("DINHEIRO")}>
                        <label onMouseOver={() => setIndexTypePaymentMoney(1)}> {/* DINHEIRO */}
                            <input type="radio" className="radio-payment"
                            value={typePaymentMoney}
                            checked={typePaymentMoney === "ATIVADO"}
                            onChange={changeTypePaymentMoney}
                            onClick={changeTypePaymentMoney}
                            />
                            <GiMoneyStack className="icon-money-payment"/>
                            <span style={{userSelect:"none"}}>DINHEIRO</span>
                        </label>
                        {typePaymentMoney === "ATIVADO" ? <div className="hide-click-type-payment-money">
                            <label>
                                <span>VALOR TOTAL R$</span>
                                <input type="text" style={{textAlign:"center",width:"100px"}}
                                id="id-total-money"
                                name="n-total-money"
                                value={checkValue(valueSale) ? valueSale + "0" : valueSale}
                                readOnly={true}
                                disabled={true}
                                required
                                />
                            </label>
                            <label>
                                <span>VALOR DE ENTRADA R$</span>
                                <input type="text" style={{textAlign:"center",width:"100px"}}
                                id="id-input-money"
                                name="n-input-money"
                                value={inputValueSale}
                                onChange={(e) => setInputValueSale(e.target.value)}
                                required
                                />
                            </label>
                            <label>
                                <span>TROCO R$ </span>
                                <input type="text" style={{textAlign:"center",width:"100px"}}
                                id="id-change-money"
                                value={changeValueSale}
                                readOnly={true}
                                name="n-change-money"
                                required
                                />
                            </label>
                        </div> : ""}
                        
                    </div> {/* FIM - DINHEIRO */}

                    <div className="click-type-payment" onClick={() => changeMethodPayment("CARTÃO")}>
                        <label onMouseOver={() => setIndexTypePaymentCard(1)}> {/* CARTÃO */}
                            <input type="radio" className="radio-payment"
                            value={typePaymentCardR}
                            checked={typePaymentCardR === "ATIVADO"}
                            onChange={changeTypePaymentCard}
                            onClick={changeTypePaymentCard}
                            />
                            <HiMiniCreditCard  className="icon-card-payment"/>
                            <span style={{userSelect:"none"}}>CARTÃO</span>
                            <RiVisaFill  className="icon-card-visa"/>
                            <FaCcMastercard className="icon-card-mastercard"/>
                            <SiNubank className="icon-card-nubank"/>
                            <FaCcDiscover className="icon-card-discover"/>
                        </label>
                        {typePaymentCardR === "ATIVADO" ? <div style={{height:"90px"}} className="hide-click-type-payment-card">
                                    <div className="hide-card-one" style={{border:"1px solid white",borderRadius:"10px",paddingRight:"5px",paddingTop:"3px",paddingBottom:"4px",height:"80px"}}>
                                        <label className="hide-card-radio">
                                            <input type="radio"
                                            value="CRÉDITO"
                                            checked={typePaymentCard === "CRÉDITO"}
                                            onChange={changeTypeCard}
                                            />
                                            <GiReceiveMoney className="icon-hide-type-card"/>
                                            <span style={{marginBottom:"30px",color:colorTypeCard === "COLOR_CRÉDITO" ? "#7076f4" : "#fff",textShadow:colorTypeCard === "COLOR_CRÉDITO" ? ".3px .3px 3px #000" : ""}}>CRÉDITO</span>
                                        </label>
                                        <label className="hide-card-radio">
                                                <input type="radio"
                                                value="DÉBITO"
                                                checked={typePaymentCard === "DÉBITO"}
                                                onChange={changeTypeCard}
                                                />
                                                <GiPayMoney className="icon-hide-type-card"/>
                                                <span style={{marginBottom:"30px",color:colorTypeCard === "COLOR_DÉBITO" ? "#7076f4" : "#fff",textShadow:colorTypeCard === "COLOR_DÉBITO" ? ".3px .3px 3px #000" : ""}}>DÉBITO</span>
                                        </label>
                                    </div>

                                    <div className="flags-card">
                                            <label>
                                                <input type="radio" 
                                                value="VISA"
                                                checked={cardFlag === "VISA"}
                                                onChange={changeFlagCard}
                                                />
                                                <RiVisaFill className="icon-flags" style={{color:colorFlagCard === "COLOR_VISA" ? "#7076f4" : "#fff"}}/>                                               
                                            </label>
                                            <label>
                                                <input type="radio" 
                                                value="MASTERCARD"
                                                checked={cardFlag === "MASTERCARD"}
                                                onChange={changeFlagCard}
                                                />
                                                <FaCcMastercard className="icon-flags" style={{color:colorFlagCard === "COLOR_MASTERCARD" ? "#7076f4" : "#fff"}}/>                                             
                                            </label>
                                            <label>
                                                <input type="radio" 
                                                value="NUBANK"
                                                checked={cardFlag === "NUBANK"}
                                                onChange={changeFlagCard}
                                                />
                                                <SiNubank className="icon-flags" style={{color:colorFlagCard === "COLOR_NUBANK" ? "#7076f4" : "#fff"}}/>                                              
                                            </label>
                                            <label>
                                                <input type="radio" 
                                                value="DISCOVER"
                                                checked={cardFlag === "DISCOVER"}
                                                onChange={changeFlagCard}
                                                />
                                                <FaCcDiscover className="icon-flags" style={{color:colorFlagCard === "COLOR_DISCOVER" ? "#7076f4" : "#fff"}}/>                                              
                                            </label>
                                    </div>
                               

                                <div className="hide-card-initial"> {/* NOME,NÚMERO */}
                                    <label className="hide-card-initial-span">
                                        <span>NOME</span>
                                        <input type="text" style={{width:"370px",textAlign:"center"}}
                                        id="id-name-card"
                                        name="n-name-card"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                        />
                                    </label>
                                    <label className="hide-card-initial-span">
                                        <span>NÚMERO</span>
                                        <input type="text" style={{width:"200px",textAlign:"center"}}
                                        id="id-number-card"
                                        name="n-number-card"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        />
                                    </label>
                                </div>

                                    <div className="hide-card-finally"> {/* CPF/CNPJ,BANDEIRA,VALID,COD/SEGURANÇA */}
                                        <label className="hide-card-finally-span">
                                            <span>CPF/CNPJ</span>
                                            <input type="text" style={{width:"150px",textAlign:"center"}}
                                            id="id-cpfcnpj-card"
                                            name="n-cpfcnpj-card"
                                            value={cpfCnpjHolder}
                                            onChange={(e) => setCpfCnpjHolder(e.target.value)}
                                            />
                                        </label>
                                        <label className="hide-card-finally-span">
                                            <span>VALIDADE</span>
                                            <input type="text" style={{width:"100px",textAlign:"center"}}
                                            id="id-expiration-card"
                                            name="n-expiration-card"
                                            value={expirationDateCard}
                                            onChange={(e) => setExpirationDateCard(e.target.value)}
                                            />
                                        </label>
                                        <label className="hide-card-finally-span">
                                            <span>SEGURANÇA</span>
                                            <input type="text" style={{width:"80px",textAlign:"center"}}
                                            id="id-cvcCwCard-card"
                                            name="n-cvcCwCard-card"
                                            value={cvcCwCard}
                                            onChange={(e) => setCvcCwCard(e.target.value)}
                                            />
                                        </label>                                        
                                    </div>
                                    <div style={{position:"absolute",left:"300px",top:"70px"}}>
                                        <label className="hide-card-finally-span">
                                            <span>TOTAL R$ </span>
                                            <input type="text" style={{width:"110px",textAlign:"center"}}
                                            id="id-cvcCwCard-card"
                                            name="n-cvcCwCard-card"
                                            value={checkValue(valueSale) ? valueSale + "0" : valueSale}
                                            disabled={true}
                                            />
                                        </label>
                                    </div>
                        </div> : ""}
                    </div> {/* FIM - CARTÃO */}

                    <div className="click-type-payment" onClick={() => changeMethodPayment("PIX")}>
                        <label onMouseOver={() => setIndexTypePaymentPix(1)}> {/* PIX */}
                            <input type="radio" className="radio-payment"
                            value={typePaymentPix}
                            checked={typePaymentPix === "ATIVADO"}
                            onChange={changeTypePaymentPix}
                            onClick={changeTypePaymentPix}
                            />
                            <FaPix className="icon-pix-payment"/>
                            <span style={{userSelect:"none"}}>PIX</span>
                        </label>
                        {typePaymentPix === "ATIVADO" ? <div className="hide-click-type-payment-pix">
                            <div className="qrCode-pix">
                                {qrCodePisSale && (
                                    <QRCode
                                    title="qrCodePis"
                                    value={qrCodePisSale}
                                    bgColor="#ddd"
                                    fgColor="#000"
                                    size="110"
                                    />
                                )}
                            </div>

                            <div className="fields-pix">
                                <label>
                                    <span style={{marginLeft:"-1px"}}>TOTAL R$ </span>
                                    <input type="text" style={{textAlign:"center",width:"120px"}}
                                    id="id-amount-pix"
                                    name="n-amount-pix"
                                    value={checkValue(valueSale) ? valueSale + "0" : valueSale}
                                    disabled={true}
                                    required
                                    />
                                </label>
                                <label style={{marginTop:"8px"}}>
                                    <span style={{fontSize:"1rem"}}>* O qrCode é gerado a partir do valor total da comanda!</span>
                                </label>
                            </div>
                        </div> : ""}
                    </div> {/* FIM - PIX */}

                </div>

            </div>

            <div className="data-finally-sales"> 
                <label>
                    <span>DATA: </span>
                    <input type="text" style={{width:"120px",textAlign:"center"}}
                    id="id-date-sale"
                    name="n-date-sale"
                    value={dateSale}
                    disabled={true}
                    required
                    />
                </label>

                <label>
                    <button type="button" onClick={handleHourSystemCommand} disabled={btnHourSales === "DESATIVADO" ? true : false} style={{pointerEvents:eventCursorHourSales}}>HORA</button>
                    <input type="text" style={{width:"110px",textAlign:"center"}} 
                    id="id-hour-sale"
                    name="n-hour-sale"
                    value={hourSale}
                    disabled={true}
                    required
                    />
                </label>

                <label>
                    <button type="button" onClick={changeColorStatusSale} disabled={btnStatusSales === "DESATIVADO" ? true : false} style={{pointerEvents:eventCursorStatusSales}}>SITUAÇÃO</button>
                    <input type="text" style={{width:"130px",textAlign:"center",backgroundColor:paymentStatus === "PENDENTE" ? "#ff0000" : "#018a01",color:"#ddd"}}
                    id="id-status-sale"
                    name="n-status-sale"
                    value={paymentStatus === "PENDENTE" ? "PENDENTE" : "FINALIZADO"}
                    disabled={true}
                    required
                    />
                </label>
            </div>

            {/* INÍCIO - BOTÕES DE AÇÃO [NOVO-CANCELAR-SALVAR-GERAR NOTA FISCAL] */}                    
            <div className="group-buttons-action-sales">

                    <button type="button" disabled={btnNewSale} style={{backgroundColor: colorNewSales, cursor: cursorNewSales}} onClick={(e) => handleClickNewSale(e)}><MdCreateNewFolder className="icon-button-action-sales"/>NOVA VENDA</button>

                    <button type="button" onClick={(e) => handleClickCancelSale(e)} disabled={btnCancelSale} style={{backgroundColor: colorCancelSales, cursor: cursorCancelSales}}><TiCancel className="icon-button-action-sales"/>CANCELAR VENDA</button>

                    <button type="button" onClick={(e) => handleClickSaveSale(e)} disabled={btnSaveSale} style={{backgroundColor: colorSaveSales, cursor: cursorSaveSales}}><BiSolidSave className="icon-button-action-sales"/>FINALIZAR VENDA</button>

                    <button type="button" disabled={btnInvoiceSale} style={{backgroundColor: colorInvoiceSales, cursor: cursorInvoiceSales}} onClick={openModalRel}><FaFileInvoiceDollar className="icon-button-action-sales"/>NOTA FISCAL</button>
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={closeModalRel}
                        ariaHideApp={false}
                        id="modal-rel-sales"
                        >
                        <div className="container-modal">
                            <div className="title-modal-rel">
                                <img src={logoSystemMainHeader} alt="logotipo da empresa" />
                                <div className="data-title-modal-rel">
                                    <p> CNPJ: 23.654.145/0001 - 98   IE: 034346578</p>
                                    <p>REI DOS LANCHES LTDA</p>
                                    <p>RUA FRANCISCO RAIMUNDO DE CARVALHO, 5-62, NOVA ESPERANÇA, BAURU, SP</p>
                                </div>
                            </div>

                            <div className="data-value-modal-rel">
                                <p style={{fontSize:".97rem"}}>Documento Auxiliar da Nota Fiscal de Consumidor Eletrônica</p>
                                <hr style={{fontWeight:"600",color:"#000"}}/>
                                <table className="table-rel">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Descrição</th>
                                            <th>Qtde</th>
                                            <th>Un</th>
                                            <th>Vl.Unit</th>
                                            <th>Vl.Total</th>
                                        </tr>
                                    </thead>
                                            {commandSale && commandSale?.map((saleModal) => (   
                                    <tbody key={saleModal.id}>
                                                    {saleModal && saleModal.item?.map((itemModal) => (
                                                <tr key={itemModal.idItemCart}>  
                                                    <td>{itemModal.idItemCart}</td>
                                                    <td>{itemModal.descItemCart}</td>
                                                    <td>{itemModal.amountItemCart}</td>
                                                    <td style={{textAlign:"center"}}>x</td>
                                                    <td>R$ {checkValue(itemModal.valueSaleItemCart) ? itemModal.valueSaleItemCart + "0" : itemModal.valueSaleItemCart}</td>
                                                    <td>R$ {itemModal.amountItemCart * itemModal.valueSaleItemCart}</td>                                                                                                        
                                                </tr>
                                                    ))}
                                    </tbody>
                                            ))}
                                </table>
                                 <hr style={{fontWeight:"600",color:"#000"}}/>
                               
                                 <ul className="list-modal-finally">                                              
                                    <div>
                                        <div className="item-ini">
                                                <li>
                                                    <p style={{fontWeight:"600"}}>Qtdade. total de itens</p>
                                                    <p style={{marginLeft:"310px"}}>{loadAmountUnitRel}</p>
                                                </li>
                                                <li>
                                                    <p style={{fontWeight:"600"}}>Valor Total</p>
                                                    <p style={{marginLeft:"358px"}}>R$ {checkValue(loadAmountRel) ? loadAmountRel + "0" : loadAmountRel}</p>
                                                </li>                                                       
                                        </div>

                                        <div className="item-fin">
                                            <li>
                                                <p style={{fontWeight:"600"}}>FORMA DE PAGAMENTO</p>
                                                <p>{loadPaymentTypeRel}{loadPaymentRel}</p>
                                            </li>
                                            <li>
                                                <p style={{marginLeft:"288px",fontWeight:"600"}}>VALOR PAGO</p>
                                                <p style={{marginLeft:"288px"}}>R$ {checkValue(loadAmountRel) ? loadAmountRel + "0" : loadAmountRel}</p>
                                            </li>
                                        </div>
                                    </div>                                      
                                 </ul>
                                 <hr style={{fontWeight:"600",color:"#000"}}/>
                                
                                 <div className="modal-list-dataAdd">
                                    <p style={{fontWeight:"600"}}>Consulta pela Chave de Acesso em</p>
                                    <p>http://nfce.sefaz.pe.gov.br/nfce/consulta</p>
                                    <p>26.18.1212263187000103850020000343871054717914</p>
                                </div>

                                <div className="modal-list-dataQrCode">
                                    {qrCodePisSale && (
                                    <QRCode 
                                    className="qrCode-modal"
                                    title="qrCodePis"
                                    value={qrCodePisSale}
                                    bgColor="#fffcfcff"
                                    fgColor="#000"
                                    size="160"
                                    />
                                )}
                                    <div className="modal-sublist-dataQrCode">
                                            <p style={{fontWeight:"600"}}>CONSUMIDOR NÃO IDENTIFICADO</p>
                                        <div className="modal-proc">
                                            <p style={{fontWeight:"600"}}>NFC-e nº 34387 Série 2</p>
                                            <p style={{fontWeight:"600"}}>{dateSale} {hourSale}</p>
                                            <p style={{fontWeight:"600"}}>Via Consumidor</p>
                                            <p style={{fontWeight:"600"}}>Protocolo de autorização</p>
                                            <p>326180658469666</p>
                                            <p style={{fontWeight:"600"}}>Data de autorização</p>
                                            <p>{dateSale} {hourSale}</p>
                                        </div>
                                    </div>
                                </div>      
                                <br />
                                <hr style={{fontWeight:"600",color:"#000"}}/>      

                                <div className="modal-list-fin">
                                    <p>Pedido 188 3A TECNOLOGIA  81 3126 5220/3223  4083 Aplicativo sistêmico</p>
                                    <p>REI DOS LANCHES V 1.0.0 Série 96708033 Valor aproximado aos tributos.</p>
                                </div>

                            </div>    

                            </div>    
                            <div className="modal-btn">
                                <button className="btnPrint-rel" type="button" onClick={window.print}>IMPRIMIR</button>
                                <button className="btnClose-rel" type="button" onClick={closeModalRel}>FECHAR</button>
                            </div>
                    </Modal>     
                  
            </div>
            {/* FIM - BOTÕES DE AÇÃO */}

            {/* ÍNICIO - GESTÃO - LISTA DE VENDAS */}                    
            <div className="management-list-sales">
                <ul className="general-management-list-sales">
                    {sales && sales?.map((sale) => (
                        <li className="item-list-management-sales" key={sale.id}>

                            <div className="group-initial-sales-management"> {/* DADOS INICIAIS */}
                                <p>REGISTRO: {sale.registerSaleCommand}</p>
                                <p>CONSUMO: {sale.consumptionSaleCommand}</p>
                                <p>MESA: {sale.tableCommandSale}</p>
                            </div>

                            <div className="group-items-cart-management-sales"> {/* CARRINHO */}
                                {sale.itemsSale?.map((itemManagSale) => (
                                    <div className="subgroup-items-cart-management-sale" key={itemManagSale.idItemCartSale}>
                                        <img src={itemManagSale.photoItemCartSale} alt="foto do produto da comanda para o cadsatro da venda" />
                                        <div className="items-cart-medium-management-sales">
                                            <p>{itemManagSale.descItemCartSale}</p>
                                            <p>x {itemManagSale.amountItemCartSale}</p>
                                            <p style={{color: "red",fontWeight: "bolder"}}>R$ {checkValue(itemManagSale.valueSaleItemCartSale) ? itemManagSale.valueSaleItemCartSale + "0" : itemManagSale.valueSaleItemCartSale}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="group-address-management-sales"> {/* DADOS DE ENDEREÇO */}
                                <div className="address-title-management">
                                    <p><FaAddressBook className="icon-address-management"/>DADOS DE ENDEREÇO</p>
                                </div>
                                <div className="address-data-management">
                                     <div className="address-data-manag-initial">
                                        <p><span>CEP:</span> {sale.deliveryAddressCep}</p>
                                        <p style={{textTransform:"uppercase"}}><span>LOGRADOURO:</span> {sale.deliveryAddressRoad}</p>
                                        <p style={{textTransform:"uppercase"}}><span>NÚMERO:</span> {sale.deliveryAddressNumber}</p>
                                     </div>
                                     <div className="address-data-manag-medium">
                                        <p style={{textTransform:"uppercase"}}><span>BAIRRO:</span> {sale.deliveryAddressHood}</p>
                                        <p style={{textTransform:"uppercase"}}><span>CIDADE:</span> {sale.deliveryAddressCity}</p>
                                        <p style={{textTransform:"uppercase"}}><span>ESTADO:</span> {sale.deliveryAddressState}</p>
                                        <p style={{textTransform:"uppercase"}}><span>UF:</span> {sale.deliveryAddressUf}</p>
                                        <p style={{textTransform:"uppercase"}}><span>REGIÃO:</span> {sale.deliveryAddressRegion}</p>
                                     </div>
                                </div>
                            </div>

                            <div className="group-invoicing-management-sales">
                                <div className="invoicing-title-management">
                                    <p><FaMoneyBill1Wave className="icon-title-management"/> DADOS DE FATURAMENTO</p>
                                </div>

                                <div className="invoicing-initial-management-sales">
                                    <p style={{color: "red",fontWeight: "bolder"}}><span style={{color:"#000", fontStyle:"italic",fontFamily:"revert"}}>VALOR TOTAL: </span> R$ {checkValue(sale.valueSale) ? sale.valueSale + "0" : sale.valueSale}</p>
                                    <p style={{color: "red",fontWeight: "bolder"}}><span style={{color:"#000", fontStyle:"italic",fontFamily:"revert"}}>FORMA DE PAGAMENTO:</span> {sale.paymentMethod}</p>
                                </div>

                                <div className="payment-type-management-sales">
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
                                   <BsQrCode className="icon-list-pix"/> 
                                 <div className="pix-sales-data">
                                  <p><span>NOME: </span>{sale.cardName}</p>
                                  <p><span>CPF/CNPJ: </span>{sale.cpfCnpjHolder}</p>
                                 </div>
                                 </div>)}

                                </div>
                            </div>

                            <div className="group-data-management-finally"> {/*FINAIS [DATA,HORA,SITUAÇÃO E BOTÃO DELETAR*/}
                                    <div className="finally-title-management-sales">
                                        <p><SiDwavesystems  className="icon-title-management-finally"/>DADOS DE SISTEMA</p>
                                    </div>
                                    <div className="finally-data-sales">
                                        <div className="finally-sales-date">
                                            <p><span style={{fontFamily:"inherit"}}>DATA:</span></p>
                                            <p>{sale.dateSale}</p>
                                        </div>
                                        <div className="finally-sales-hour">
                                            <p><span style={{fontFamily:"inherit"}}>HORA:</span> </p>
                                            <p>{sale.hourSale}</p>
                                        </div>
                                        <div className="finally-sales-status">
                                            <p><span style={{fontFamily:"inherit"}}>SITUAÇÃO:</span> </p>
                                            <p>{sale.paymentStatus}</p>
                                        </div>
                                        <div className="finally-sales-status">
                                            <button type="button" onClick={() => handleClickDeleteSale(sale.id)} className="button-del-finally-sales" style={{cursor:isCursorDelSales,pointerEvents:eventDelSales}} disabled={isDisabledDelSales}>DELETAR</button>
                                        </div>
                                    </div>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
            {/* FIM - GESTÃO - LISTA DE VENDAS */}                 
                    
        </form>
                    
    </div>

  )

}

export default Sales