import type { Trade } from "@/types";
import { api } from "@/lib/api";

type GetTradesResponse = {
	data: Trade[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
};
export const getTrades = async (
	page: number,
	limit = 20,
	params?: Record<string, unknown>
) => {
	const { data } = await api.get<GetTradesResponse>("/trades", {
		params: { page, limit, ...params },
	});
	return data;
};

export const deleteTrade = async (tradeId: string) => {
	const { data } = await api.delete(`/trades/${tradeId}`);
	return data;
};
