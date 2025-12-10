//REACT
import { Outlet } from "react-router-dom"
//COMPONENTES
import MainHeader from './components/MainHeader/MainHeader'
import NavMainHeader from './components/NavMainHeader/NavMainHeader'
//CSS
import './App.css'
import MainFooter from "./components/MainFooter/MainFooter"
import FastMenu from "./components/FastMenu/FastMenu"

function App() {

  return (
    
    <div className='App'>
      <FastMenu/>
      <div className="app-width">
        <NavMainHeader/>
        <Outlet/>
        <MainFooter/>
      </div>
    </div>

  )
}

export default App
