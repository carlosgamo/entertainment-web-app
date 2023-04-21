import { createBrowserRouter } from "react-router-dom";
import LayoutRoot from '../layout/LayoutRoot.jsx';
import LayoutPrivate from '../layout/LayoutPrivate.jsx';

import Home from '../Pages/Home/Home'
import Login from '../components/Login.jsx'
import ControlPanel from "../Pages/ControlPanel/ControlPanel";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutRoot/>,
        children:   [
            {
                index: true,
                element: <Login/>
            },
            {
                path: '/home',
                element: <LayoutPrivate/>,
                children: [
                    {
                        index: true,
                        element: <Home/>
                    }
                ]
            },
            {
                path: '/controlpanel',
                element: <LayoutPrivate/>,
                children: [
                    {
                        index: true,
                        element: <ControlPanel/>
                    }
                ]
            }
        ]

    }
])