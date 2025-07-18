import { Routes, Route } from "react-router-dom";
import Layout from "@components/Layout/Layout.jsx";
import AppRoutes from "@routes/AppRoutes";
import "./App.css";

function App() {
    return (
        <Layout>
            <AppRoutes />
        </Layout>
    );
}

export default App;
