// REACT
import { useState, useRef, useEffect, useLayoutEffect } from "react"
import { useRequests } from "../hooks/useRequests.jsx"
import { Tooltip } from "@mui/material"
// CSS
import "./Products.css"
// ÍCONES
import { MdLunchDining, MdCreateNewFolder, MdDelete   } from "react-icons/md" 
import { GiConsoleController, GiFrenchFries, GiSlicedBread, GiStairsCake  } from "react-icons/gi"
import { FaCandyCane } from "react-icons/fa6"
import { RiDrinks2Fill } from "react-icons/ri"
import { IoSearchCircleSharp } from "react-icons/io5"
import { GrUpdate } from "react-icons/gr"
import { TiCancel } from "react-icons/ti"
import { BiSolidSave } from "react-icons/bi"
import { AiOutlineClear } from "react-icons/ai"
// IMAGENS
import photo_product from "../assets/images/products_photo.png"

const url = "http://localhost:3000/products"

const Products = () => {

  const [valueSaleProduct, setValueSaleProduct] = useState("")
  const [idProduct, setIdProduct] = useState("")
  const [descriptionProduct,setDescriptionProduct] = useState("")

  const [indexControlProducts,setIndexControlProducts] = useState(null) // CONTROLE DE AÇÃO***

  const { data: products, httpConfig, delRegister, getProductsUpdate, updateRegister, getRefreshRegister, orderRegisters } = useRequests(url)

  const [tempId,setTempId] = useState("") // ID TEMPORÁRIO PARA ATUALIZAÇÃO

  // ******ORDENAÇÃO DE REGISTROS************
  const [orderProducts,setOrderProducts] = useState(1) 
  const [columnProducts,setColumnProducts] = useState("idProduct")

  const handleOrderProducts = (fieldName) => {
    setOrderProducts(-orderProducts)
    setColumnProducts(fieldName)
    orderRegisters(orderProducts,columnProducts)
  }
  //*******FIM - ORDENAÇÃO DE REGISTROS**** */

  // INÍCIO - ENVIO DA REQUISIÇÃO************

  const handleClickSaveProduct = async (e) => { // BOTÃO SALVAR

    if (idProduct === "" || descriptionProduct === "" || typeProduct === "" || valueSaleProduct === "") {
      swal({
        icon: "warning",
        title: "REI DOS LANCHES",
        text: "Existe(m) campo(s) a ser(em) preenchido(s)!"
      })
    }
    else if (idProduct !== "" && descriptionProduct !== "" && typeProduct !== "" && valueSaleProduct !== "") {
      // VERIFICAÇÃO DE INDÍCE DE OPERAÇÃO***
      if(indexControlProducts === 2){ // ALTERAÇÃO
        swal("Confirma a alteração do produto?", {
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
        const objProducts = {
          idProduct, //ok
          descriptionProduct, // ok
          typeProduct, // ok
          valueSaleProduct, //ok
          photoProduct //ok
        }
       updateRegister(url,objProducts,tempId)
       swal({
            icon: "success",
            title: "REI DOS LANCHES",
            text: "Produto alterado com sucesso!"
          })
          setIndexOpProducts(0)
          setIndexOpProductsId(0)
          setBtnNewProduct(false)
          setBtnCancelProduct(true)
          setBtnSaveProduct(true)
          setBtnSearchPhotoProduct(true)
          setBtnClearPhotoProduct(true)

          setIndexPhotoProduct(false)

          setColorNewProducts(optionsProducts[0]) 
          setColorCancelProducts(optionsProducts[1])
          setColorSaveProducts(optionsProducts[1])
          setColorSearchPhotoProducts(optionsProducts[1])
          setColorClearPhotoProducts(optionsProducts[1])
          setCursorNewProduct(optionsProducts[2])
          setCursorCancelProduct(optionsProducts[3])
          setCursorSaveProduct(optionsProducts[3])
          setCursorSearchPhotoProduct(optionsProducts[3])
          setCursorClearPhotoProduct(optionsProducts[3])

          // TIPO DE PRODUTOS
          setRbLunchTypeProduct(true)
          setRbPortionTypeProduct(true)
          setRbPastryTypeProduct(true)
          setRbDessertTypeProduct(true)
          setRbIndustrialTypeProduct(true)
          setRbDrinkTypeProduct(true)

          setIconLunchTypeProduct(optionsProducts[5])
          setIconPortionTypeProduct(optionsProducts[5])
          setIconPastryTypeProduct(optionsProducts[5])
          setIconDessertTypeProduct(optionsProducts[5])
          setIconIndustrialTypeProduct(optionsProducts[5])
          setIconDrinkTypeProduct(optionsProducts[5])

          setSpanLunchTypeProduct(optionsProducts[5])
          setSpanPortionTypeProduct(optionsProducts[5])
          setSpanPastryTypeProduct(optionsProducts[5])
          setSpanDessertTypeProduct(optionsProducts[5])
          setSpanIndustrialTypeProduct(optionsProducts[5])
          setSpanDrinkTypeProduct(optionsProducts[5])

          setListTypeProduct(optionsProducts[4])

          setIdProduct("")
          setDescriptionProduct("")
          setTypeProduct("")
          setValueSaleProduct("")
          setPhotoProduct(photo_product)
       console.log("id certo: " + tempId)
      }}))
      } //**ALTERAÇÃO*/
      
      if (indexControlProducts === 1){ // INCLUSÃO
      const response = await fetch(`http://localhost:3000/products?idProduct=${idProduct}`)
      const dataResponse = await response.json()
      if (dataResponse.length !== 0){
        swal({
          icon: "error",
          title: "REI DOS LANCHES",
          text: "O Id já existe no sistema!"
        })
        inputIdProduct.current.focus()
      } 
      if (dataResponse.length === 0){
        swal("Confirma o cadastro do produto?", {
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
          // ***LÓGICA PARA CONFIRMAÇÃO DO CADASTRO DO PRODUTO***
          const objProducts = {
            idProduct, //ok
            descriptionProduct, // ok
            typeProduct, // ok
            valueSaleProduct, //ok
            photoProduct //ok
          }
      
          httpConfig(objProducts, "POST")
          setIndexOpProducts(0)
          swal({
            icon: "success",
            title: "REI DOS LANCHES",
            text: "Produto cadastrado com sucesso!"
          })

        if (btnSaveProduct == false){
          setIndexOpProducts(0)
          setIndexOpProductsId(0)
          setBtnNewProduct(false)
          setBtnCancelProduct(true)
          setBtnSaveProduct(true)
          setBtnSearchPhotoProduct(true)
          setBtnClearPhotoProduct(true)

          setIndexPhotoProduct(false)

          setColorNewProducts(optionsProducts[0]) 
          setColorCancelProducts(optionsProducts[1])
          setColorSaveProducts(optionsProducts[1])
          setColorSearchPhotoProducts(optionsProducts[1])
          setColorClearPhotoProducts(optionsProducts[1])
          setCursorNewProduct(optionsProducts[2])
          setCursorCancelProduct(optionsProducts[3])
          setCursorSaveProduct(optionsProducts[3])
          setCursorSearchPhotoProduct(optionsProducts[3])
          setCursorClearPhotoProduct(optionsProducts[3])

          // TIPO DE PRODUTOS
          setRbLunchTypeProduct(true)
          setRbPortionTypeProduct(true)
          setRbPastryTypeProduct(true)
          setRbDessertTypeProduct(true)
          setRbIndustrialTypeProduct(true)
          setRbDrinkTypeProduct(true)

          setIconLunchTypeProduct(optionsProducts[5])
          setIconPortionTypeProduct(optionsProducts[5])
          setIconPastryTypeProduct(optionsProducts[5])
          setIconDessertTypeProduct(optionsProducts[5])
          setIconIndustrialTypeProduct(optionsProducts[5])
          setIconDrinkTypeProduct(optionsProducts[5])

          setSpanLunchTypeProduct(optionsProducts[5])
          setSpanPortionTypeProduct(optionsProducts[5])
          setSpanPastryTypeProduct(optionsProducts[5])
          setSpanDessertTypeProduct(optionsProducts[5])
          setSpanIndustrialTypeProduct(optionsProducts[5])
          setSpanDrinkTypeProduct(optionsProducts[5])

          setListTypeProduct(optionsProducts[4])

          setIdProduct("")
          setDescriptionProduct("")
          setTypeProduct("")
          setValueSaleProduct("")
          setPhotoProduct(photo_product)
      }
        }})) 
          }  
        }
      }
  }
  // FIM - ENVIO DA REQUISIÇÃO**************

  // INÍCIO - HABILITAR E DESABILITAR BOTÕES DE NAVEGAÇÃO

  // 0- SEM OPERAÇÃO 1-NOVO 2-ALTERAR 3-DELETAR 4-CANCELAR 5-SALVAR
  const [indexOpProducts, setIndexOpProducts] = useState(0) 
  const [indexOpProductsId,setIndexOpProductsId] = useState(0)
  // **************************************************************

  const [btnNewProduct, setBtnNewProduct] = useState(false)
  const [btnCancelProduct, setBtnCancelProduct] = useState(true)
  const [btnSaveProduct, setBtnSaveProduct] = useState(true)
  const [btnSearchPhotoProduct,setBtnSearchPhotoProduct] = useState(true)
  const [btnClearPhotoProduct,setBtnClearPhotoProduct] = useState(true)
  const [rbLunchTypeProduct,setRbLunchTypeProduct] = useState(true)
  const [rbPortionTypeProduct,setRbPortionTypeProduct] = useState(true)
  const [rbPastryTypeProduct,setRbPastryTypeProduct] = useState(true)
  const [rbDessertTypeProduct,setRbDessertTypeProduct] = useState(true)
  const [rbIndustrialTypeProduct,setRbIndustrialTypeProduct] = useState(true)
  const [rbDrinkTypeProduct,setRbDrinkTypeProduct] = useState(true)

  const [typeProduct,setTypeProduct] = useState("")

  const inputIdProduct = useRef(null)
  const inputDescriptionProduct = useRef(null)
  const inputValueSaleProduct = useRef(null)

  const [colorNewProducts, setColorNewProducts] = useState("#0044ffcb")
  const [colorCancelProducts, setColorCancelProducts] = useState("#0044ff96")
  const [colorSaveProducts, setColorSaveProducts] = useState("#0044ff96")
  const [colorSearchPhotoProducts,setColorSearchPhotoProducts] = useState("#0044ff96")
  const [colorClearPhotoProducts,setColorClearPhotoProducts] = useState("#0044ff96")

  const [cursorNewProduct, setCursorNewProduct] = useState("pointer")
  const [cursorCancelProduct, setCursorCancelProduct] = useState("default")
  const [cursorSaveProduct, setCursorSaveProduct] = useState("default")
  const [cursorSearchPhotoProduct,setCursorSearchPhotoProduct] = useState("default")
  const [cursorClearPhotoProduct,setCursorClearPhotoProduct] = useState("default")

  const [iconLunchTypeProduct,setIconLunchTypeProduct] = useState("none")
  const [iconPortionTypeProduct,setIconPortionTypeProduct] = useState("none")
  const [iconPastryTypeProduct,setIconPastryTypeProduct] = useState("none")
  const [iconDessertTypeProduct,setIconDessertTypeProduct] = useState("none")
  const [iconIndustrialTypeProduct,setIconIndustrialTypeProduct] = useState("none")
  const [iconDrinkTypeProduct,setIconDrinkTypeProduct] = useState("none")

  const [spanLunchTypeProduct,setSpanLunchTypeProduct] = useState("none")
  const [spanPortionTypeProduct,setSpanPortionTypeProduct] = useState("none")
  const [spanPastryTypeProduct,setSpanPastryTypeProduct] = useState("none")
  const [spanDessertTypeProduct,setSpanDessertTypeProduct] = useState("none")
  const [spanIndustrialTypeProduct,setSpanIndustrialTypeProduct] = useState("none")
  const [spanDrinkTypeProduct,setSpanDrinkTypeProduct] = useState("none")

  const [listTypeProduct,setListTypeProduct] = useState("fill")

    const changeTypeProduct = (e) => {
        setTypeProduct(e.target.value)
        //console.log("valor: " + e.target.value)
    }

    // 0 - ATIVO, 1 - INATIVO, 2 - CURSOR PONTEIRO, 3 - CURSOR PADRÃO, 4 - ELEMENTO ATIVADO
    // 5 - ELEMENTO DESATIVADO
    const optionsProducts = ["#0044ffcb","#0044ff96","pointer","default","fill","none"] 

    const handleClickNewProduct = () => { // BOTÃO - NOVO PRODUTO
     if (btnNewProduct == false){
        setIndexControlProducts(1)
        setIndexOpProductsId(1)
        setIndexOpProducts(1)
        setBtnNewProduct(true)
        setBtnCancelProduct(false)
        setBtnSaveProduct(false)
        setBtnSearchPhotoProduct(false)
        setBtnClearPhotoProduct(false)
        setColorNewProducts(optionsProducts[1]) 
        setColorCancelProducts(optionsProducts[0])
        setColorSaveProducts(optionsProducts[0])
        setColorSearchPhotoProducts(optionsProducts[0])
        setColorClearPhotoProducts(optionsProducts[0])
        setCursorNewProduct(optionsProducts[3])
        setCursorCancelProduct(optionsProducts[2])
        setCursorSaveProduct(optionsProducts[2])
        setCursorSearchPhotoProduct(optionsProducts[2])
        setCursorClearPhotoProduct(optionsProducts[2])

        // TIPO DE PRODUTOS
        setRbLunchTypeProduct(false)
        setRbPortionTypeProduct(false)
        setRbPastryTypeProduct(false)
        setRbDessertTypeProduct(false)
        setRbIndustrialTypeProduct(false)
        setRbDrinkTypeProduct(false)

        setIconLunchTypeProduct(optionsProducts[4])
        setIconPortionTypeProduct(optionsProducts[4])
        setIconPastryTypeProduct(optionsProducts[4])
        setIconDessertTypeProduct(optionsProducts[4])
        setIconIndustrialTypeProduct(optionsProducts[4])
        setIconDrinkTypeProduct(optionsProducts[4])

        setSpanLunchTypeProduct(optionsProducts[4])
        setSpanPortionTypeProduct(optionsProducts[4])
        setSpanPastryTypeProduct(optionsProducts[4])
        setSpanDessertTypeProduct(optionsProducts[4])
        setSpanIndustrialTypeProduct(optionsProducts[4])
        setSpanDrinkTypeProduct(optionsProducts[4])

        setListTypeProduct(optionsProducts[5])

        inputIdProduct.current.focus()
      }
    }

    const handleClickCancelProduct = () => { // BOTÃO - CANCELAR PRODUTO
      swal("Deseja realmente cancelar o cadastro ou alteração do produto?", {
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
          if (btnCancelProduct == false){
        setIndexControlProducts(1)
        setIndexOpProducts(0)
        setIndexOpProductsId(0)
        setBtnNewProduct(false)
        setBtnCancelProduct(true)
        setBtnSaveProduct(true)
        setBtnSearchPhotoProduct(true)
        setBtnClearPhotoProduct(true)

        setIndexPhotoProduct(false)

        setColorNewProducts(optionsProducts[0]) 
        setColorCancelProducts(optionsProducts[1])
        setColorSaveProducts(optionsProducts[1])
        setColorSearchPhotoProducts(optionsProducts[1])
        setColorClearPhotoProducts(optionsProducts[1])
        setCursorNewProduct(optionsProducts[2])
        setCursorCancelProduct(optionsProducts[3])
        setCursorSaveProduct(optionsProducts[3])
        setCursorSearchPhotoProduct(optionsProducts[3])
        setCursorClearPhotoProduct(optionsProducts[3])

        // TIPO DE PRODUTOS
        setRbLunchTypeProduct(true)
        setRbPortionTypeProduct(true)
        setRbPastryTypeProduct(true)
        setRbDessertTypeProduct(true)
        setRbIndustrialTypeProduct(true)
        setRbDrinkTypeProduct(true)

        setIconLunchTypeProduct(optionsProducts[5])
        setIconPortionTypeProduct(optionsProducts[5])
        setIconPastryTypeProduct(optionsProducts[5])
        setIconDessertTypeProduct(optionsProducts[5])
        setIconIndustrialTypeProduct(optionsProducts[5])
        setIconDrinkTypeProduct(optionsProducts[5])

        setSpanLunchTypeProduct(optionsProducts[5])
        setSpanPortionTypeProduct(optionsProducts[5])
        setSpanPastryTypeProduct(optionsProducts[5])
        setSpanDessertTypeProduct(optionsProducts[5])
        setSpanIndustrialTypeProduct(optionsProducts[5])
        setSpanDrinkTypeProduct(optionsProducts[5])

        setListTypeProduct(optionsProducts[4])

        setIdProduct("")
        setDescriptionProduct("")
        setTypeProduct("")
        setValueSaleProduct("")
        setPhotoProduct(photo_product)

        getRefreshRegister(url)
      }
        }
      }))
        
    }

    const handleClickDeleteProduct = async (idDelProd) => { // BOTÃO - DELETAR PRODUTO
      swal("Deseja realmente deletar o produto?", {
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
          delRegister(url+"/"+idDelProd,idDelProd)
          swal({
           icon: "success",
           title: "REI DOS LANCHES",
           text: "Produto deletado com sucesso!"
            })  
          }
      }))   
      }

    // BOTÃO ATUALIZAR PRODUTO
    const handleClickUpdateProduct = async (idUpdateProd,idProd,descProd,typeProd,valueSaleProd,photoProd,tUp) => { 
      handleClickNewProduct()
      getProductsUpdate(url,idUpdateProd)

      setIdProduct(idProd)
      setDescriptionProduct(descProd)
      setTypeProduct(typeProd)
      setValueSaleProduct(valueSaleProd)
      setIndexPhotoProduct(true)
      setPhotoProduct(photoProd)
      setIndexControlProducts(2)
      setIndexOpProductsId(0)
      
      setTempId(tUp)
      //console.log("id: " + idUpdateProd)
      //console.log("id temp: " + tUp)
    }

  // FIM - HABILITAR E DESABILITAR BOTÕES DE NAVEGAÇÃO

  // INÍCIO - GESTÃO DE FOTOS DOS PRODUTOS
    const [photoProduct, setPhotoProduct] = useState(photo_product)
    const inputPhotoProduct = useRef(null)
    const [indexPhotoProduct, setIndexPhotoProduct] = useState(false)

    const clickButtonPhoto = (e) => { 
      e.preventDefault()
      inputPhotoProduct.current.click()
      console.log("valor:" + btnNewProduct)
    }

    const handleOpenPhotoProduct = (e) => {
      const filePhotoProduct = e.target.files[0]
      if (filePhotoProduct){
        const readerPhotoProduct = new FileReader()
        readerPhotoProduct.onload = (e) => {
          setPhotoProduct(e.target.result)
          setIndexPhotoProduct(true)
        }
        readerPhotoProduct.readAsDataURL(filePhotoProduct)
        console.log("foto" + filePhotoProduct)
      }
    }

    const clickButtonClearPhoto = (e) => {
      e.preventDefault()
      setIndexPhotoProduct(false)
      setPhotoProduct(photo_product)
    }

  // FIM - GESTÃO DE FOTOS DOS PRODUTOS

  // INÍCIO - FUNÇÃO PARA USO DE MÁSCARA DE VALOR DE VENDA
  const checkValue = (valueSale) => {
        const decimalPart = valueSale.toString().split(".")[1] || ''
        const numberDecimal = decimalPart.length
        if (numberDecimal === 1)
        return numberDecimal + "0"
      }
  // FIM - FUNÇÃO PARA USO DE MÁSCARA DE VALOR DE VENDA

  // INÍCIO - VALIDAÇÃO DE INPUT DE VALOR DE VENDA
  const validDigits = (textDigited) => {
    return textDigited.replace(/[^0-9.]/g, "")
  }

  const ChangeMaskValueSale = (e) => {
    const updateTextDigited = validDigits(e.target.value)
    setValueSaleProduct(updateTextDigited)
  }
  // FIM - VALIDAÇÃO DE VALOR DE VENDA

  // INÍCIO - VALIDAÇÃO DE INPUT DE ID
  const validDigitsId = (textDigitedId) => {
    return textDigitedId.replace(/[^0-9]/g, "")
  }

  const ChangeMaskIdProduct = (e) => {
    const updateTextDigitedId = validDigitsId(e.target.value)
    setIdProduct(updateTextDigitedId)
  }
  // FIM - VALIDAÇÃO DE ID

  return (

    <div className='container-products'> 
        <h2>GESTÃO DE PRODUTOS</h2>
        <form className="form-register-products">

              <label> {/* ID DE PRODUTOS */}
                <span className="span-normal" style={{marginLeft: "-186px"}}>Id:</span>
                <input type="text" style={{marginLeft: "7px", width: "100px"}}
                id="id-id-product"
                name="n-id-product"
                value={idProduct}
                onChange={(e) => ChangeMaskIdProduct(e)}
                ref={inputIdProduct}
                disabled={indexOpProductsId == 1 ? false : true}
                required
                />
              </label>
              <label> {/* DESCRIÇÃO DE PRODUTOS */}
                <span className="span-normal" style={{marginLeft: "-7px"}}>Descrição:</span>
                <input type="text" style={{marginLeft: "8px",width: "400px"}}
                id="id-description-product"
                name="n-description-product"
                onChange={(e) => setDescriptionProduct(e.target.value.toUpperCase())}
                ref={inputDescriptionProduct}
                value={descriptionProduct}
                disabled={indexOpProducts == 1 ? false : true}
                required
                />
              </label>
         

            {/* INÍCIO - TIPOS DE PRODUTOS */}
            <h4>SELECIONE UMA CATEGORIA PARA CADASTRAR O PRODUTO</h4>
            <div className="group-type-products">
              <label className="type-product" style={{backgroundColor: typeProduct === "LANCHES" ? "#b3b3b4ff" : "#cfcecb"}}>
                <input type="radio" 
                value="LANCHES"
                checked={typeProduct === "LANCHES"}
                onChange={changeTypeProduct}
                disabled={indexOpProducts == 1 ? false : true}
                />
                <MdLunchDining className="icon-type-product" style={{pointerEvents:iconLunchTypeProduct}}/>
                <span style={{pointerEvents:spanLunchTypeProduct}}>LANCHES</span>
              </label>
              
              <label className="type-product" style={{backgroundColor: typeProduct === "PORÇÕES" ? "#b3b3b4ff" : "#cfcecb"}}>
                <input type="radio" 
                value="PORÇÕES"
                checked={typeProduct === "PORÇÕES"}
                onChange={changeTypeProduct}
                disabled={indexOpProducts == 1 ? false : true}
                />
                <GiFrenchFries className="icon-type-product" style={{pointerEvents:iconPortionTypeProduct}}/>
                <span style={{pointerEvents:spanPortionTypeProduct}}>PORÇÕES</span>
              </label>

              <label className="type-product" style={{backgroundColor: typeProduct === "PASTÉIS" ? "#b3b3b4ff" : "#cfcecb"}}>
                <input type="radio" 
                value="PASTÉIS"
                checked={typeProduct === "PASTÉIS"}
                onChange={changeTypeProduct}
                disabled={indexOpProducts == 1 ? false : true}
                />
                <GiSlicedBread className="icon-type-product" style={{pointerEvents:iconPastryTypeProduct}}/>
                <span style={{pointerEvents:spanPastryTypeProduct}}>PASTÉIS</span>
              </label>
              
              <label className="type-product" style={{backgroundColor: typeProduct === "SOBREMESAS" ? "#b3b3b4ff" : "#cfcecb"}}>
                <input type="radio" 
                value="SOBREMESAS"
                checked={typeProduct === "SOBREMESAS"}
                onChange={changeTypeProduct}
                disabled={indexOpProducts == 1 ? false : true}
                />
                <GiStairsCake className="icon-type-product" style={{pointerEvents:iconDessertTypeProduct}}/>
                <span style={{pointerEvents:spanDessertTypeProduct}}>SOBREMESAS</span>
              </label>

              <label className="type-product" style={{backgroundColor: typeProduct === "INDUSTRIAIS" ? "#b3b3b4ff" : "#cfcecb"}}>
                <input type="radio" 
                value="INDUSTRIAIS"
                checked={typeProduct === "INDUSTRIAIS"}
                onChange={changeTypeProduct}
                disabled={indexOpProducts == 1 ? false : true}
                />
                <FaCandyCane className="icon-type-product" style={{pointerEvents:iconIndustrialTypeProduct}}/>
                <span style={{pointerEvents:spanIndustrialTypeProduct}}>INDUSTRIAIS</span>
              </label>
              
              <label className="type-product" style={{backgroundColor: typeProduct === "BEBIDAS" ? "#b3b3b4ff" : "#cfcecb"}}>
                <input type="radio" 
                value="BEBIDAS"
                checked={typeProduct === "BEBIDAS"}
                onChange={changeTypeProduct}
                disabled={indexOpProducts == 1 ? false : true}
                />
                <RiDrinks2Fill className="icon-type-product" style={{pointerEvents:iconDrinkTypeProduct}}/>
                <span style={{pointerEvents:spanDrinkTypeProduct}}>BEBIDAS</span>
              </label>
            </div> 
            {/* FIM - TIPOS DE PRODUTOS */}

              <label style={{paddingTop: "10px"}}> {/* VALOR DE PRODUTOS */}
              <span className="span-normal" style={{marginLeft: "-69px"}}>R$:</span>
              <input type="text" style={{marginLeft: "7px", width: "100px"}}
              id="id-sale-product"
              name="n-sale-product"
              value={valueSaleProduct}
              onChange={(e) => ChangeMaskValueSale(e)}
              ref={inputValueSaleProduct}
              disabled={indexOpProducts == 1 ? false : true}
              required
              />
              <span className="info-sale-product">* Digite o valor do produto</span>
            </label>

            {/* INÍCIO - FOTO DE PRODUTOS */}
            <div className="group-photo-products">
                <input type="file" className="area-photo-product"
                id="photo-open-product"
                accept="image/png, image/jpeg"
                onChange={(e) => handleOpenPhotoProduct(e)}
                ref={inputPhotoProduct}
                style={{ display: 'none' }}
                required
                />
                {indexPhotoProduct === false && <img className="area-photo-product" src={photo_product} alt="foto carregada" />}
                {indexPhotoProduct === true && <img className="area-photo-product" src={photoProduct} alt="foto carregada" />}
              <button style={{backgroundColor: colorSearchPhotoProducts, cursor: cursorSearchPhotoProduct}} disabled={btnSearchPhotoProduct} onClick={clickButtonPhoto}><IoSearchCircleSharp className="icon-button-photo"/> Procurar</button>
              <button style={{backgroundColor: colorClearPhotoProducts, cursor: cursorClearPhotoProduct}} disabled={btnClearPhotoProduct} onClick={clickButtonClearPhoto}><AiOutlineClear className="icon-button-photo"/> Limpar</button>
            </div>
            {/* FIM - FOTO DE PRODUTOS */}

            {/* INÍCIO - BARRA DE AÇÕES - PRODUTOS */}
              <div className="group-actions-products">
                  <button type="button" style={{backgroundColor: colorNewProducts, cursor: cursorNewProduct}} disabled={btnNewProduct} onClick={handleClickNewProduct} ><MdCreateNewFolder className="icon-actions-products"/> Novo</button>
                  <button type="button" style={{backgroundColor: colorCancelProducts, cursor: cursorCancelProduct}} disabled={btnCancelProduct} onClick={handleClickCancelProduct}><TiCancel className="icon-actions-products"/> Cancelar</button>
                  <button type="button" style={{backgroundColor: colorSaveProducts, cursor: cursorSaveProduct}} disabled={btnSaveProduct} onClick={handleClickSaveProduct}><BiSolidSave className="icon-actions-products"/> Salvar</button>
              </div>
            {/* FIM - BARRA DE AÇÕES - PRODUTOS */} 
        </form>

        {/* INÍCIO - LISTA DE PRODUTOS CADASTRADOS */} 
        <div className="list-products-container"> 
            <table>
              <thead>
                <tr>                 
                  <Tooltip title="Ordenação de produtos por Id em ordem crescente ou decrescente!">
                    <th onClick={(e) => handleOrderProducts("idProduct")}>ID</th>
                  </Tooltip>
                  <Tooltip title="Ordenação de produtos por descrição em ordem crescente ou decrescente!">
                    <th onClick={(e) => handleOrderProducts("descriptionProduct")}>DESCRIÇÃO</th>
                  </Tooltip>
                  <Tooltip title="Ordenação de produtos por tipo em ordem crescente ou decrescente!">
                    <th onClick={(e) => handleOrderProducts("typeProduct")}>TIPO DE PRODUTO</th>
                  </Tooltip>
                  <Tooltip title="Ordenação de produtos por valor de venda em ordem crescente ou decrescente!">
                    <th onClick={(e) => handleOrderProducts("valueSaleProduct")}>VALOR</th>
                  </Tooltip>
                </tr>
              </thead>
            
            <tbody>
              {products && products.map((items) => (
                <tr key={items.idProduct} style={{pointerEvents:listTypeProduct}}>
                     <td>{items.idProduct}</td> 
                     <td>{items.descriptionProduct}</td> 
                     <td>{items.typeProduct}</td> 
                     <td>R$ {checkValue(items.valueSaleProduct) ? items.valueSaleProduct + "0" : items.valueSaleProduct}</td> 
                     <td className="line-update-product"><button className="btn-del-update-product" type="button" onClick={() => handleClickUpdateProduct(items.id,items.idProduct,items.descriptionProduct,items.typeProduct,items.valueSaleProduct,items.photoProduct,items.id)}><GrUpdate className="icon-update-product"/></button></td>
                     <td className="line-del-product"><button className="btn-del-update-product" type="button" onClick={() => handleClickDeleteProduct(items.id)}><MdDelete className="icon-delete-product"/></button></td>
                </tr>
              ))}
                
            </tbody>
            </table>
        </div>

    </div>

  )
}

export default Products