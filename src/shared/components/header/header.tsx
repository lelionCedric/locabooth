import SocialNetwork from "./social-network/social-network.tsx";
import Menu from "../menu/menu.tsx";
import "./header.css";

const Header = () => {
    return (
        <>
            <header>
                <div className="logo">
                    <img className="logo_img" src="/logo.jpg" alt=""/>
                    <h1>LOCABOOTH</h1>
                </div>
                <SocialNetwork/>
            </header>
            <Menu/>
        </>
);
};
export default Header;
