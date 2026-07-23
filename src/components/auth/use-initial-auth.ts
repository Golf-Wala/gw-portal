import { useEffect, useState } from "react";
import { useAuthStore } from "./auth-store";
import { api } from "@/lib/api";

export default function useInitialAuth() {
	const [isInitializing, setIsInitializing] = useState(true);
	const { user, hasHydrated, setAccessToken, logout } = useAuthStore();

	useEffect(() => {
		if (!hasHydrated) return;

		if (!user) {
			setIsInitializing(false);
			return;
		}

		const initAuth = async () => {
			try {
				const { data } = await api.post<{ accessToken: string }>(
					"/auth/refresh"
				);
				setAccessToken(data.accessToken);
			} catch {
				logout();
			} finally {
				setIsInitializing(false);
			}
		};

		initAuth();
	}, [hasHydrated, user]);

	return isInitializing;
}
