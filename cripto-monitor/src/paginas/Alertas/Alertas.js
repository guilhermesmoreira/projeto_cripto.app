import { MonitorarPreco } from "../../components/MonitorarPreco/MonitorarPreco";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import style from "./Alertas.module.css";

export function Alertas() {
    return (
        <div className={style.conteudo}>
            <Sidebar>
                <Topbar>
                    <div className={style.pagina_conteudo}>
                        <MonitorarPreco/>
                    </div>
                </Topbar>
            </Sidebar>
        </div>
    )
}