import type { Club } from "@/types";

export interface Trade {
	_id: string;
	customerName: string;
	customerPhone?: string;
	clubsIn: string[] | Club[];
	clubsOut: string[] | Club[];
	cash: number; // negative = cash out, positive = cash in
	notes?: string;
	createdAt: string;
	updatedAt: string;
}

export const EMPTY_TRADE: Trade = {
	_id: "",
	customerName: "",
	customerPhone: "",
	clubsIn: [],
	clubsOut: [],
	cash: 0,
	notes: "",
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};
