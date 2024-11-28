import { NavLink } from "react-router";

export default function Header() {
    return (
        <header>
            <nav className="w-full bg-slate-500 p-4">
                <ul className="flex ">
                    <li>
                        <NavLink to={"/"}   className={({ isActive }) => isActive ? "text-blue-200 font-bold" : "text-white font-semibold"}>
                            Solicitar viagem
                        </NavLink>
                    </li>
                    <li className="ml-3">
                        <NavLink to={"/travel-history"}   className={({ isActive }) => isActive ? "text-blue-200 font-bold" : "text-white font-semibold"}>
                            Histórico de viagens
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}