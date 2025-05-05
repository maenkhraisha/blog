import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home.jsx";
import PostListPage from "./routes/PostListPage.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import Write from "./routes/Write.jsx";
import SinglePost from "./routes/SinglePost.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/posts",
                element: <PostListPage />,
            },
            {
                path: "/:slug",
                element: <SinglePost />,
            },
            {
                path: "/write",
                element: <Write />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <RouterProvider router={router} />
        </ClerkProvider>
    </StrictMode>
);
