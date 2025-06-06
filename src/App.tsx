import './App.css';
import {RouterProvider} from "react-router";
import {router} from "./pages/router";
import {AuthProvider} from "./auth/AuthProvider.tsx";

export function App (){
    return (
        <AuthProvider>
            <RouterProvider router={router} fallbackElement={<p>Chargement</p>}/>
        </AuthProvider>
    );
}

export default App;