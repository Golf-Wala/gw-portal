import { useQuery } from "@tanstack/react-query";
import { getTrades, deleteTrade, createTrade } from "./trade.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Trade } from "@/types";

export function useGetTrades(
	page: number,
	limit = 20,
	params?: Record<string, unknown>
) {
	return useQuery({
		queryKey: ["trades", page, limit],
		queryFn: () => getTrades(page, limit, params),
		placeholderData: (prev) => prev,
	});
}

export function useCreateTrade() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (trade: Partial<Trade>) => createTrade(trade),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["trades"] });
		},
	});
}

export function useDeleteTrade() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteTrade(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["trades"] });
		},
	});
}
