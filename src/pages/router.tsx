import {createBrowserRouter, RouteObject} from "react-router-dom";
import {Routes} from '../shared/enums/Routes'
import {Layout} from "../shared/components/layout/layout";
import {Accueil} from "./accueil";
import {Disponibilite} from "./disponibilite";
import {PageGalerie} from "./page-galerie";
import {Tarif} from "./tarif";
import Error from "../shared/components/errorPage/error.tsx";
import {Admin} from "./admin";
import {requireAuth} from "../auth/requireAuth.ts";
import {Login} from "./login";
import {Avis} from "./avis";
import {CreationAvis} from "./avis/creationAvis";

export const routes: RouteObject[] = [
    {
        id: 'accueil',
        path: Routes.accueil,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Accueil />
            }
        ],
    },
    {
        id: 'diponibilites',
        path: Routes.disponibilites,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Disponibilite />
            }
        ],
    },
    {
        id: 'galerie',
        path: Routes.galerie,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <PageGalerie />
            }
        ],
    },
    {
        id: 'tarif',
        path: Routes.tarif,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Tarif />
            }
        ],
    },
    {
        id: 'avis',
        path: Routes.avis,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Avis />
            }
        ],
    },
    {
        id: 'ajouter-avis',
        path: Routes.ajouterAvis,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <CreationAvis />
            }
        ],
    },
    {
        id: 'login',
        path: Routes.login,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Login />
            }
        ],
    },
    {
        id: 'admin',
        path: Routes.admin,
        element: <Layout />,
        children: [
            {
                index: true,
                loader: requireAuth,
                element: <Admin />
            }
        ],
    },
    {
        id:'error',
        path: Routes.error,
        element: <Layout />,
        children: [
            {
                path: "*",
                element: <Error />
            }
        ],
    }
];

export const router= createBrowserRouter(routes);