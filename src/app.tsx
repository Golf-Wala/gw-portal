import { Routes, Route, Navigate } from "react-router-dom";
import TradesRoot from "./components/trade";
import Layout from "./components/layout";
import useInitialAuth from "./components/auth/use-initial-auth";
import LogoutPage from "./components/auth/logout-page";
import LoginPage from "./components/auth/login-page";
import Authenticated from "./components/auth/authenticated";
import ProtectedRoute from "./components/auth/protected-route";
import InventoryPage from "./components/inventory";
import DashboardPage from "./components/dashboard";

export default function App() {
	const isInitializing = useInitialAuth();

	if (isInitializing) return <h2>Loading...</h2>;

	return (
		<Routes>
			{/* public routes */}
			<Route path="logout" element={<LogoutPage />} />

			{/* auth routes */}
			<Route element={<Authenticated />}>
				<Route path="login" element={<LoginPage />} />
			</Route>

			{/* protected routes */}
			<Route
				element={
					<ProtectedRoute allowedRoles={["admin", "employee"]} />
				}
			>
				<Route element={<Layout />}>
					<Route index element={<DashboardPage />} />
					<Route path="inventory" element={<InventoryPage />} />
					<Route path="trades/*" element={<TradesRoot />} />
				</Route>
			</Route>

			{/* catch-all */}
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
