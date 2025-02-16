import React, { useState } from "react";
import style from "./MonitorarPreco.module.css";

export function MonitorarPreco() {
  const [cripto, setCripto] = useState(""); // Criptomoeda
  const [moeda, setMoeda] = useState(""); // Moeda para conversão
  const [precoAlvo, setPrecoAlvo] = useState(""); // Preço alvo
  const [mensagem, setMensagem] = useState(""); // Mensagem de status
  const [monitorando, setMonitorando] = useState(false); // Para controlar o status de monitoramento

  const monitorarPreco = async () => {
    if (!cripto || !moeda || !precoAlvo) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setMonitorando(true);
    setMensagem("Iniciando monitoramento...");

    try {
      // Chamada para a API para iniciar o monitoramento
      const resposta = await fetch("http://127.0.0.1:5000/monitorar-preco", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cripto,
          moeda,
          preco_alvo: parseFloat(precoAlvo),
        }),
      });

      const data = await resposta.json();
      if (data.message) {
        setMensagem(data.message);
      }
    } catch (erro) {
      console.error("Erro ao iniciar monitoramento:", erro);
      setMensagem("Erro ao iniciar monitoramento.");
    }
  };

  const handleNovaConsulta = () => {
    setCripto("");
    setMoeda("");
    setPrecoAlvo("");
    setMensagem("");
    setMonitorando(false);
  };

  return (
    <div className={style.monitoramento_container}>
      <div className={style.monitoramento_form}>
        <h2>Monitoramento de Criptomoeda</h2>

        <input
          type="text"
          placeholder="Digite a criptomoeda (ex: bitcoin)"
          value={cripto}
          onChange={(e) => setCripto(e.target.value)}
        />
        <input
          type="text"
          placeholder="Digite a moeda (ex: brl)"
          value={moeda}
          onChange={(e) => setMoeda(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço alvo"
          value={precoAlvo}
          onChange={(e) => setPrecoAlvo(e.target.value)}
        />

        <button onClick={monitorarPreco} disabled={monitorando}>
          {monitorando ? "Monitorando..." : "Iniciar Monitoramento"}
        </button>

        {mensagem && <p>{mensagem}</p>}

        <button
          className={style.nova_consulta_button}
          onClick={handleNovaConsulta}
        >
          Nova Consulta
        </button>
      </div>
    </div>
  );
}
