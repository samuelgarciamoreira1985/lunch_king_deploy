// CSS
import "./Home.css"
// IMAGENS
import iconSystem from "../assets/images/logo-system.png"

const Home = () => {

  return (

    <div className="home-container">
        
        <img src={iconSystem} className="img-system-home" alt="imagem do sistema" />
    </div>

  )
}

export default Home