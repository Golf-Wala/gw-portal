import type { User } from "@/types";
import { useAuthStore } from "./auth-store";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
	allowedRoles?: User["role"][];
}

export default function ProtectedRoute({ allowedRoles = [] }: Props) {
	const { user, hasHydrated } = useAuthStore();

	if (!hasHydrated) return null;

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
