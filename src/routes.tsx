import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ShoppingCart from "./components/ShoppingCart";
import ErrorPage from "./pages/ErrorPage";
import GameDetailPage from "./pages/GameDetailPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'games/:slug',
                element: <GameDetailPage />
            },
            {
                path: '/loginform',
                element: <LoginForm />
            },
            {
                path: '/registerform',
                element: <RegisterForm />
            },
            {
                path: '/cart',
                element: <ShoppingCart />
            }
        ]
    }
])

export default router;