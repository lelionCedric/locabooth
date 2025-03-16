import Header from "../header/header";
import Footer from "../footer/footer";
import './layout.css'
import {Outlet} from "react-router-dom";

export const Layout = () =>{
    return (
        <>
            <div className="page-container">
                <Header/>
                <main role="main"><Outlet/></main>
                <Footer/>
            </div>

        </>
    );
};