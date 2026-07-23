import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./auth-store";
import { api } from "@/lib/api";

export default function LogoutPage() {
	const navigate = useNavigate();
	const logout = useAuthStore((state) => state.logout);
	const hasRun = useRef(false);

	useEffect(() => {
		if (hasRun.current) return;
		hasRun.current = true;

		const performLogout = async () => {
			try {
				await api.post("/auth/logout");
			} catch {
			} finally {
				logout();
				navigate("/login", { replace: true });
			}
		};

		performLogout();
	}, [logout, navigate]);

	return <h2>Logging out...</h2>;
}
