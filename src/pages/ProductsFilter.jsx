//REACT
import { useContext, useEffect } from "react"
import { FilterProdContext } from "../Context/FilterProductsContext"
// CUSTOM HOOKS
import { useSearch } from "../hooks/useSearch"
// CSS
import "./ProductsFilter.css"

const url = "http://localhost:3000/products"

const ProductsFilter = () => {

    const { data: itemProduct, getProductsType } = useSearch(url)

    const { indexFilterProducts,setIndexFilterProducts } = useContext(FilterProdContext)

    const checkValue = (valueSale) => {
        const decimalPart = valueSale.toString().split(".")[1] || ''
        const numberDecimal = decimalPart.length
        if (numberDecimal === 1)
        return numberDecimal + "0"
      }

      useEffect(() => {
        getProductsType(url,indexFilterProducts)
      },[indexFilterProducts])

  return (

    <div id="list-products-container">
        <h2>{indexFilterProducts}</h2>
        <ul id="general-list-products">
          {itemProduct && itemProduct.map((product) => (
            <li className="item-list-product" key={product.idProduct}>
            <div className="group-photo-product"><img src={product.photoProduct} alt="foto do produto" /></div>
            <p>{product.descriptionProduct}</p>
            <p>{product.typeProduct}</p>
            <p style={{color: "red",fontWeight: "bolder"}}>R$ {checkValue(product.valueSaleProduct) ? product.valueSaleProduct + "0" : product.valueSaleProduct}</p>
            </li>
          ))}
        </ul>
    </div>

  )
}

export default ProductsFilter