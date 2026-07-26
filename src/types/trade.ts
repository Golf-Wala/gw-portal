import type { Club } from "@/types";

export interface Trade {
	_id: string;
	status: "pending" | "accepted" | "rejected";
	customerName: string;
	customerContact?: string;
	clubsIn: string[] | Club[];
	clubsOut: string[] | Club[];
	cash: number; // negative = cash out, positive = cash in
	notes?: string;
	createdAt: string;
	updatedAt: string;
}

export const EMPTY_TRADE: Trade = {
	_id: "",
	status: "pending",
	customerName: "",
	customerContact: "",
	clubsIn: [],
	clubsOut: [],
	cash: 0,
	notes: "",
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};
