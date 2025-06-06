import {createBrowserRouter, RouteObject} from "react-router-dom";
import {Routes} from '../shared/enums/Routes'
import {Layout} from "../shared/components/layout/layout";
import {Accueil} from "./accueil";
import {Disponibilite} from "./disponibilite";
import {PageGallerie} from "./page-gallerie";
import {Tarif} from "./tarif";
import Error from "../shared/components/errorPage/error.tsx";
import {Admin} from "./admin";
import {requireAuth} from "../auth/requireAuth.ts";
import {Login} from "./login";

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
        id: 'diponibilite',
        path: Routes.disponibilite,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Disponibilite />
            }
        ],
    },
    {
        id: 'gallerie',
        path: Routes.gallerie,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <PageGallerie />
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