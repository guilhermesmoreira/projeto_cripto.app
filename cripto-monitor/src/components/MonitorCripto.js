import React, { useState } from "react";
import axios from "axios";
import style from '../components/MonitorCripto.module.css';

export function MonitorCripto () {
    const [cripto, setCripto] = useState("bitcoin");
    const [moeda, setMoeda] = useState("brl");
    const [preco, setPreco] = useState(null);

    const buscarPreco = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/preco?cripto=${cripto}&moeda=${moeda}`);
            setPreco(response.data.preco);
        } catch (error) {
            console.error("Erro ao buscar preço:", error);
        }
    };

    return(
        <div className={style.pagina_cabecalho}>
            <h1>Monitor de Preço de Criptomoedas</h1>
            <input
                type="text"
                value={cripto}
                onChange={(e) => setCripto(e.target.value)}
                placeholder="Criptomoeda"
            />
            <input
                type="text"
                value={moeda}
                onChange={(e) => setMoeda(e.target.value)}
                placeholder="Moeda"
            />
            <button onClick={buscarPreco}>Consultar Preço</button>
            {preco && <h2>Preço: {preco}</h2>}
        </div>
    )
}