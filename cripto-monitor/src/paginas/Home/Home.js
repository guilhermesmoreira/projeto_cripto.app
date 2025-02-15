
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import style from "./Home.module.css";

export function Home() {
    return (
        <div className={style.conteudo}>
            <Sidebar>
                <Topbar>
                    <div className={style.pagina_conteudo}>
                        <h3>Seja Bem Vindo.</h3>
                        <h2>Utilize o menu a esquerda para ir para a funcionalidade desejada!</h2>
                    </div>
                </Topbar>
            </Sidebar>
        </div>
    )
}