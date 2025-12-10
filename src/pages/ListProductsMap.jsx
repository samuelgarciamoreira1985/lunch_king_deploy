// CUSTOM HOOKS
import { useSearch } from "../hooks/useSearch"
// CSS
import "./ListProductsMap.css"

const url = "http://localhost:3000/products"

const ListProductsMap = () => {

  const { data: itemProduct } = useSearch(url)

      const checkValue = (valueSale) => {
        const decimalPart = valueSale.toString().split(".")[1] || ''
        const numberDecimal = decimalPart.length
        if (numberDecimal === 1)
        return numberDecimal + "0"
      }
   
  return (

    <div id="list-products-container">
        <h2>PRODUTOS</h2>
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

export default ListProductsMap