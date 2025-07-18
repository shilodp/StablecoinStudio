import { Routes, Route } from "react-router-dom";
import Register from "@pages/Register/Register";
import Dashboard from "@pages/Dashboard";
import StablecoinStudio from "@pages/StablecoinStudio.jsx";
import PrivateRoute from "@features/auth/PrivateRoute";

function AppRoutes() {
    return (<Routes>
        <Route
            path="/"
            element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            }
        >
            <Route
                path="/stablecoin"
                element={
                    <PrivateRoute>
                        <StablecoinStudio />
                    </PrivateRoute>
                }
            />
        </Route>
        <Route path="/register" element={<Register />} />
    </Routes>);
}

export default AppRoutes;
