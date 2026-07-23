import type { Club } from "@/types";
import { create } from "zustand";

interface ClubState {
	club: Club | null;
	setClub: (club: Club | null) => void;
}

export const useClubStore = create<ClubState>((set) => ({
	club: null,
	setClub: (club) => set({ club }),
}));
