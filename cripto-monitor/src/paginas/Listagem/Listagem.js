import React, { useEffect, useState } from "react";
import style from './Listagem.module.css';
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";

export function Listagem() {
    const [criptos, setCriptos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:5000/top-criptos")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Erro ao buscar criptomoedas");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Dados recebidos da API Flask:", data); // Log para depuração
                if (Array.isArray(data)) { // Verifica se a resposta é um array
                    setCriptos(data);
                } else {
                    throw new Error("Resposta da API não é um array");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar criptos", error);
                setErro("Erro ao carregar as criptomoedas.");
                setLoading(false);
            });
    }, []);

    const formatarPreco = (preco) => {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <Sidebar>
            <Topbar>
                <div className={style.conteudo}>
                    <h1 className={style.titulo}>Top 10 Criptomoedas com maior valor de Mercado</h1>
                    {loading && <p>Carregando...</p>}
                    {erro && <p className={style.erro}>{erro}</p>}
                    {Array.isArray(criptos) && criptos.length > 0 ? ( // Verifica se criptos é um array e não está vazio
                        <table className={style.tabela}>
                            <thead>
                                <tr className={style.tabelaCabecalho}>
                                    <th className={style.tabelaCelula}>Criptomoeda</th>
                                    <th className={style.tabelaCelula}>Preço (BRL)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {criptos.map((cripto, index) => (
                                    <tr key={index} className={style.tabelaColuna}>
                                        <td className={style.tabelaCelula}>{cripto.nome}</td>
                                        <td className={style.tabelaCelula}>
                                            {formatarPreco(cripto.preco)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Nenhuma criptomoeda encontrada.</p> // Mensagem caso o array esteja vazio
                    )}
                </div>
            </Topbar>
        </Sidebar>
    );
}