// REACT
import { Link } from "react-router-dom"
// CSS
import "./MainHeader.css"
//IMAGENS
import logoSystemMainHeader from "../../assets/images/logo-system.png"
// ÍCONES
import { FcSearch } from "react-icons/fc"

const MainHeader = () => {

  return (

    <div className="main-header-container">
        <div className="icon-header">
            <Link to="/"><img src={logoSystemMainHeader} alt="Ícone do sistema" /></Link>
        </div>

            <form className="form-inputs-search">
                <fieldset>
                    <legend>Selecione um padrão de busca</legend>
                    <select name="n-search-options" id="id-search-options">
                        <option value="userHeaderMain">USUÁRIOS - NOME</option>
                        <option value="productHeaderMain">PRODUTOS - DESCRIÇÃO</option>
                        <option value="commandHeaderMain">COMANDAS - DATA</option>
                        <option value="saleHeaderMain">VENDAS - DATA</option>
                    </select>
                    <input type="text"
                    id="id-search-fast"
                    name="n-search-fast"
                    placeholder="Digite o valor da pesquisa..."
                    required
                    max={50}
                    min={1}
                    />
                    <button id="id-btn-buscar"><FcSearch className="icon-search"/></button>
                </fieldset>
            </form>
        </div>

  )
}

export default MainHeader