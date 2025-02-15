import style from "./Sidebar.module.css";
import { MdGroup, MdListAlt } from "react-icons/md";
import Cripto from "../../assets/cripto.png";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";


export function Sidebar({ children }) {
    return (
        <div>
            <div className={style.sidebar_conteudo}>
                <div className={style.sidebar_header}>
                    <img src={Cripto} alt="cripto " className={style.logo_cripto} />
                    <hr className={style.linha} />
                </div>
                <div className={style.sidebar_corpo}>
                   <SidebarItem texto="Consulta" link="/consulta" logo={<HiMiniMagnifyingGlass />}/>
                </div>
                <div className={style.sidebar_corpo}>
                   <SidebarItem texto="Listagem" link="/listagem" logo={<MdListAlt />}/>
                </div>



            </div>
            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}