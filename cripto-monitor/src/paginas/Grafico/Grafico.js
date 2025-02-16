
import { GraficoHistorico } from "../../components/GraficoHIstorico/GraficosHistorico";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import style from "./Grafico.module.css";

export function Grafico() {
    return (
        <div className={style.conteudo}>
            <Sidebar>
                <Topbar>
                    <div className={style.pagina_conteudo}>
                        <GraficoHistorico/>
                    </div>
                </Topbar>
            </Sidebar>
        </div>
    )
}