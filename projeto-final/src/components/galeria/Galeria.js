import React, { useEffect, useState } from 'react';
import "./Galeria.css";
import Imageapi from '../../services/Imageapi';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import arrow from './img/arrow-down.svg';
import bota from './img/4.png';
import {Link} from 'react-router-dom';
import Load from "./img/load.png";

/*https://api.thecatapi.com/v1/images/search?format=json&limit=25*/

export default function Galeria({setDados}) {


    const [load, setLoad] = useState(false)


    const [imagens, setImagem] = useState([])
    function puxarDado(imagem){
      setDados({
          url:imagem
      })  
      console.log(imagem)
    }
    function loading(){
        Imageapi
            .get(`?mime_types=jpg&size=full&has_breeds=1&limit=25`)
            .then((res) => {
                console.log(res.data)
                setImagem(res.data)
                setLoad(true)

            })
            .catch((err) => console.error("ops! ocorreu um erro" + err))
    }

    useEffect(() => {
        loading()
    }, [])
    useEffect(() => {
        document.title = "Galeria"
    }, [])

    const imagensLista = imagens.map(imagem => (
    <div key={imagem.id} className="caixa-img">
        <img id="url-image" className="cat" alt="gato" src={imagem.url} />
        <div className="caixinha" id="caixinha-puxar">
            <button onClick={() => puxarDado(imagem.url)} className="botao-escolher">ADOTAR</button>
        </div>
    </div>
    ))

    return (
        <>
            <Header/>
            <div className="caixa-completa">
                <div className="caixa-espaço"></div>
                <div className="caixa-p">
                    <article className="guia">
                        <h3>Escolha o gatinho que você quer adotar!!!</h3>
                        <img className="flecha-guia" src={arrow} alt="flecha-circular-baixo" />
                    </article>
                    <div className="images">
                        {load === false ? (<img className="load" src={Load} alt="loading" />):(imagensLista)}
                    </div>
                </div>
                <div className="caixa-espaço"></div>
            </div>
            <Footer/>
        </>
    );
}