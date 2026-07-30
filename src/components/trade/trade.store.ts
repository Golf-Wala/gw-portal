import { type Club, type Trade, EMPTY_TRADE } from "@/types";
import { create } from "zustand";

type TradeStep = "contact" | "appraisal" | "review" | "club-trade" | "overview";

interface TradeState {
	trade: Trade;
	step: TradeStep;
	selectedClub: Club | null;
	paymentMethod: "cash" | "credit" | null;

	setTrade: (trade: Trade) => void;
	setStep: (step: TradeStep) => void;
	setSelectedClub: (club: Club | null) => void;
	setPaymentMethod: (method: "cash" | "credit" | null) => void;
	resetTrade: () => void;
}

export const useTradeStore = create<TradeState>((set) => ({
	trade: EMPTY_TRADE,
	step: "contact",
	selectedClub: null,
	paymentMethod: null,

	setTrade: (trade) => set({ trade }),
	setStep: (step) => set({ step }),
	setSelectedClub: (club) => set({ selectedClub: club }),
	setPaymentMethod: (method) => set({ paymentMethod: method }),
	resetTrade: () =>
		set({
			trade: EMPTY_TRADE,
			step: "contact",
			selectedClub: null,
			paymentMethod: null,
		}),
}));
