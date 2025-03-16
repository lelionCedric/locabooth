import './App.css';
import {RouterProvider} from "react-router";
import {router} from "./pages/router";

export function App (){
    return (
        <RouterProvider router={router} fallbackElement={<p>Chargement</p>}/>
    );
}

export default App;