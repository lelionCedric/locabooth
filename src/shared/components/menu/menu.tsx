import "./menu.css";
import {useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {IoClose, IoMenu} from "react-icons/io5";

const Menu = () => {

    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenuOnMobile = () => {
        if (window.innerWidth <= 1150) {
            setShowMenu(false);
        }
    };
    return (
        <div className="menu">
            <div
                className="current__menu"
                id="current-menu"
            >
                <div className={location.pathname === "/" ? "" : "visible-menu"}>
                    Accueil
                </div>
                <div className={location.pathname === "/disponibilite" ? "" : "visible-menu"}>
                    Disponibilités
                </div>
                <div className={location.pathname === "/gallerie" ? "" : "visible-menu"}>
                    Gallerie
                </div>
                <div className={location.pathname === "/tarif" ? "" : "visible-menu"}>
                    Tarif
                </div>
            </div>
            <nav className="nav container">
                <div
                    className={`nav__menu ${showMenu ? "show-menu" : ""}`}
                    id="nav-menu"
                >
                    <ul className="nav__list">
                        <li className="nav__item">
                            <NavLink to="/" className={({ isActive }) => (isActive ? "nav__link current_menu" : "nav__link")} onClick={() => closeMenuOnMobile()}>
                                Accueil
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink
                                to="/disponibilite"
                                className={({ isActive }) => (isActive ? "nav__link current_menu" : "nav__link")}
                                onClick={() => closeMenuOnMobile()}
                            >
                                Disponibilités
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink
                                to="/gallerie"
                                className={({ isActive }) => (isActive ? "nav__link current_menu" : "nav__link")}
                                onClick={() => closeMenuOnMobile()}
                            >
                                Gallerie
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink
                                to="/tarif"
                                className={({ isActive }) => (isActive ? "nav__link current_menu" : "nav__link")}
                                onClick={() => closeMenuOnMobile()}
                            >
                                Tarif
                            </NavLink>
                        </li>
                    </ul>
                    <div className="nav__close" id="nav-close" onClick={toggleMenu}>
                        <IoClose/>
                    </div>
                </div>

                <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
                    <IoMenu/>
                </div>
            </nav>
        </div>
    );
};
export default Menu;
