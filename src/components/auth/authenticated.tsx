import { useAuthStore } from "./auth-store";
import { Navigate, Outlet } from "react-router-dom";

export default function Authenticated() {
	const { user, hasHydrated } = useAuthStore();

	if (!hasHydrated) return null;
	if (user) return <Navigate to="/" replace />;

	return <Outlet />;
}
