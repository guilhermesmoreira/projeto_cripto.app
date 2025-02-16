import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import style from "./GraficoHistorico.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function GraficoHistorico() {
  const [dados, setDados] = useState(null);
  const [dias, setDias] = useState("30"); // Valor padrão
  const [criptoId, setCriptoId] = useState("bitcoin"); // Valor padrão
  const [moeda, setMoeda] = useState("brl"); // Valor padrão
  const [carregando, setCarregando] = useState(false);

  const buscarDados = async () => {
    if (!criptoId.trim() || !moeda.trim()) {
      alert("Por favor, preencha os campos corretamente.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch(
        `http://127.0.0.1:5000/historico-cripto?id=${criptoId}&moeda=${moeda}&dias=${dias}`
      );
      const resultado = await resposta.json();

      // Garante que 'precos' sempre seja um array
      setDados({
        ...resultado,
        precos: Array.isArray(resultado.precos) ? resultado.precos : [],
      });
    } catch (erro) {
      console.error("Erro ao buscar dados históricos:", erro);
      setDados({ precos: [] }); // Evita erro caso a API falhe
    }

    setCarregando(false);
  };

  useEffect(() => {
    buscarDados();
  }, [dias]); // Atualiza apenas quando o número de dias muda

  if (carregando) {
    return <p>Carregando dados...</p>;
  }

  // Verifica se dados está carregado e precos não está vazio
  if (!dados || !Array.isArray(dados.precos) || dados.precos.length === 0) {
    return <p>Nenhum dado encontrado.</p>;;
  }

  const dadosGrafico = {
    labels: dados.precos.map(([timestamp]) =>
      new Date(timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: `Preço em ${moeda.toUpperCase()}`,
        data: dados.precos.map(([, preco]) => preco),
        borderColor: "#1e2353",
        backgroundColor: "rgba(30, 35, 83, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className={style.conteudo}>
      <h2>Gráfico de Preços ({dias} dias)</h2>
    
      <div className={style.controles}>
                <input
                    type="text"
                    placeholder="Digite a criptomoeda (ex: bitcoin)"
                    value={criptoId}
                    onChange={(e) => setCriptoId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Digite a moeda (ex: brl, usd)"
                    value={moeda}
                    onChange={(e) => setMoeda(e.target.value)}
                />
                <button onClick={buscarDados}>Buscar</button>
            </div>

      <div>
        <button onClick={() => setDias("30")}>30 Dias</button>
        <button onClick={() => setDias("60")}>60 Dias</button>
        <button onClick={() => setDias("90")}>90 Dias</button>
      </div>
      <div className={style.chart_conteudo}>
        <Line data={dadosGrafico} />
      </div>
    </div>
  );
}
