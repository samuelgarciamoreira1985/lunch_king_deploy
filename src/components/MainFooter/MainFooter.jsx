// REACT
import { Link } from "react-router-dom"
import { useState,useRef } from "react";
import Modal from "react-modal";
import emailjs from '@emailjs/browser';
// CSS
import "./MainFooter.css"
// ÍCONES
import { IoArrowRedoSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiMailSendFill } from "react-icons/ri";

const MainFooter = () => {

    const [isOpenEmail,setIsOpenEmail] = useState(false) // MODAL - EMAIL
    const formEmail = useRef(); // REFERÊNCIA AO FORMULÁRIO DO EMAIL
    const refName = useRef()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [subject,setSubject] = useState("")
    const [messenger,setMessenger] = useState("")

    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: messenger
    }

    const openModalEmail = () => {
        setIsOpenEmail(true)
    }

    const closeModalEmail = () => {
        setIsOpenEmail(false)
    }
    
    emailjs.init('9rYcJkJt0nAC70YTO') // PUBLIC ID

    const sendEmail = (e) => {
        e.preventDefault()
        emailjs.send("service_zjfrp84","template_jygzekd",formData) // SERVICE ID.TEMPLATE ID
        .then(() => {
            swal({
                closeOnClickOutside: false,
                icon: "success",
                title: "REI DOS LANCHES",
                text: "Email enviado com sucesso!"
                })  
            })
            document.getElementById("form_contact").reset()
            refName.current.focus()
    }

  return (

    <div className="footer-main-container">

        
        <div className="system-map-footer"> 
            <fieldset className="field-Rel">
                <h3>Relatórios do sistema</h3>
                <div className="list-rel-system">
                    <Link to="/listproducts" className="link-rel-system">Produtos</Link>
                    <Link to="/listcommands" className="link-rel-system">Comandas</Link>
                    <Link to="/listsales" className="link-rel-system">Vendas</Link>
                </div>
            </fieldset>
        </div>

        <div className="contact-footer">  
            <IoArrowRedoSharp className="icon-contact"/>
                <button type="button" onClick={openModalEmail}>RECLAME AQUI !!!</button>
                <Modal
                isOpen={isOpenEmail}
                onRequestClose={closeModalEmail}
                ariaHideApp={false}
                id="modal-email-footer"
                >
                    <div className="container-modal-email">
                        <form ref={formEmail} onSubmit={sendEmail} id="form_contact">
                            <h2>Contatar</h2>

                            <div className="modal-name-email">
                                <label>
                                    <span>Nome</span>
                                    <input type="text"
                                    name="name-email"
                                    onChange={(e) => setName(e.target.value)}
                                    ref={refName}
                                    />
                                    <FaUserAlt className="icon-name-email"/>
                                </label>

                                <label>
                                    <span>Email</span>
                                    <input type="email"
                                    name="descricao-email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <MdEmail className="icon-descricao-email"/>
                                </label>
                            </div>

                            <div className="modal-subject-messenger-btnSend">
                                <label className="modal-subject">
                                    <span>Assunto</span>
                                    <input type="text"
                                    name="subject-email"
                                    onChange={(e) => setSubject(e.target.value)}
                                    />
                                </label>
                                <label className="modal-messenger">
                                    <span>Mensagem</span>
                                    <textarea 
                                    name="messenger-email" 
                                    id="id-messenger-email"
                                    onChange={(e) => setMessenger(e.target.value)}                                 
                                    >
                                    </textarea>
                                </label>
                                <button type="submit" className="btnSendMessenger"><RiMailSendFill className="icon-btnSendMessenger"/>Enviar mensagem</button>
                            </div>

                        </form>
                    </div>
                </Modal>
        </div>

    </div>

  )
}

export default MainFooter