import { Navigate, Route, Routes } from "react-router-dom";
import TradesPage from "./pages/trades-page";
import AddTradePage from "./pages/add-trade-page";

export default function TradesRoot() {
	return (
		<Routes>
			<Route index element={<TradesPage />} />
			<Route path="add" element={<AddTradePage />} />
			<Route path="*" element={<Navigate to="/trades" replace />} />
		</Routes>
	);
}
