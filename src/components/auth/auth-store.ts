import type { User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
	_id: string;
	role: User["role"];
	firstName: string;
	lastName: string;
	email: string;
}

interface AuthState {
	accessToken: string | null;
	user: AuthUser | null;
	hasHydrated: boolean;
	login: (accessToken: string, user: AuthUser) => void;
	setAccessToken: (accessToken: string) => void;
	logout: () => void;
	setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			accessToken: null,
			user: null,
			hasHydrated: false,
			login: (accessToken, user) => set({ accessToken, user }),
			setAccessToken: (accessToken) => set({ accessToken }),
			logout: () => set({ accessToken: null, user: null }),
			setHasHydrated: (state) => set({ hasHydrated: state }),
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({ user: state.user }),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
		}
	)
);
