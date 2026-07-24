import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { Club } from "@/types";
import {
	getClubs,
	getClubById,
	createClub,
	updateClub,
	deleteClub,
	getClubAnalytics,
} from "./club.api";

export function useGetClubs(
	page: number,
	limit = 30,
	params?: Record<string, unknown>
) {
	return useQuery({
		queryKey: ["clubs", page, limit],
		queryFn: () => getClubs(page, limit, params),
		placeholderData: (prev) => prev,
	});
}

export const useGetClubById = (id: string) => {
	return useQuery<Club>({
		queryKey: ["clubs", id],
		queryFn: () => getClubById(id),
	});
};

export function useGetClubAnalytics() {
	return useQuery({
		queryKey: ["analytics"],
		queryFn: () => getClubAnalytics(),
	});
}

export const useCreateClub = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (club: Partial<Club>) => createClub(club),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["clubs"] });
		},
	});
};

export const useUpdateClub = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (club: Partial<Club>) => updateClub(club),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["clubs"] });
		},
	});
};

export const useDeleteClub = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteClub(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["clubs"] });
		},
	});
};
