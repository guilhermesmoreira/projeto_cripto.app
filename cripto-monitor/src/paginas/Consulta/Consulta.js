import React, { useState, useEffect } from "react";
import style from "./Consulta.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";

export function Consulta() {
  const [cripto, setCripto] = useState("");
  const [moeda, setMoeda] = useState("");
  const [precoAtual, setPrecoAtual] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [dataConsulta, setDataConsulta] = useState(null);

  // Função para buscar o preço da cripto
  const consultarPreco = () => {
    fetch(`http://127.0.0.1:5000/preco/${cripto}/${moeda}`)
      .then((resposta) => resposta.json())
      .then((data) => {
        if (data.preco) {
          setPrecoAtual(data.preco);
          const dataHora = new Date();
          setDataConsulta(dataHora.toLocaleString());
          setMensagem("");
        } else {
          setMensagem("Erro ao obter o preço da cripto.");
          setPrecoAtual(null); // Limpa o preço atual
          setDataConsulta(null); // Limpa a data da consulta
        }
      })
      .catch((error) => {
        console.error("Erro ao consultar o preço:", error);
        setMensagem("Erro ao realizar a consulta.");
        setPrecoAtual(null); // Limpa o preço atual
        setDataConsulta(null); // Limpa a data da consulta
      });
  };

  const obterSimboloMoeda = (moeda) => {
    switch (moeda.toUpperCase()) {
      case "BRL":
        return "R$";
      case "USD":
        return "U$";
      case "EUR":
        return "€";
      default:
        return ""; // Retorna vazio se a moeda não for reconhecida
    }
  };

  const formatarPreco = (preco) => {
    if (!moeda) {
        return ""; // Retorna vazio se a moeda não estiver definida
    }
    
    const formato = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: moeda.toUpperCase(),
      minimumFractionDigits: 2, // Garante que sempre haverá 2 casas decimais
    });

    return formato.format(preco);
  };

  // Efeito para limpar as informações quando os inputs são alterados
  useEffect(() => {
    setPrecoAtual(null);
    setMensagem("");
    setDataConsulta(null);
  }, [cripto, moeda]);

  return (
    <Sidebar>
      <Topbar>
        <div className={style.conteudo}>
          <h1 className={style.titulo}>Consulta de Preço de Criptomoeda</h1>
          <div className={style.inputConteudo}>
            <input
              type="text"
              className={style.input}
              placeholder="Criptomoeda (ex: bitcoin)"
              value={cripto}
              onChange={(e) => setCripto(e.target.value.toLowerCase())}
            />
            <input
              type="text"
              className={style.input}
              placeholder="Moeda (ex: brl)"
              value={moeda}
              onChange={(e) => setMoeda(e.target.value.toLowerCase())}
            />
            <button className={style.button} onClick={consultarPreco}>
              Consultar Preço
            </button>
          </div>
          {mensagem && <div className={style.mensagem}>{mensagem}</div>}
          {precoAtual !== null && (
            <div className={style.resultado}>
              <h2>Preço Atual</h2>
              <p>{formatarPreco(precoAtual)}</p>
              {dataConsulta && (
                <p className={style.timestamp}>
                  Consulta realizada em: {dataConsulta}
                </p>
              )}
            </div>
          )}
        </div>
      </Topbar>
    </Sidebar>
  );
}
