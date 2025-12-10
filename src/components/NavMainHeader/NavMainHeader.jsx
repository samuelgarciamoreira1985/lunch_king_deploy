// REACT
import { Link } from "react-router-dom"
// ÍCONES
import { FaShoppingCart } from "react-icons/fa"
import { IoClipboardSharp } from "react-icons/io5"
import { RiMoneyDollarCircleFill } from "react-icons/ri"
import { MdOutlineHelp } from "react-icons/md"
import { IoIosPeople } from "react-icons/io"

//CSS
import "./NavMainHeader.css"

const NavMainHeader = () => {

  return (

    <div className="nav-main-container">
        <div className="nav-details">
          <Link to="/products" id="first-nav"><FaShoppingCart /> Produtos</Link>
          <Link to="/commands"><IoClipboardSharp /> Comandas</Link>
          <Link to="/sales" id="last-nav"><RiMoneyDollarCircleFill /> Vendas</Link>
        </div>
    </div>
    
  )
}

export default NavMainHeader