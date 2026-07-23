import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { Club } from "@/types";
import {
	getClubs,
	getClubById,
	createClub,
	updateClub,
	deleteClub,
} from "./club.api";

export const useGetClubs = (params?: Record<string, unknown>) => {
	return useQuery<Club[]>({
		queryKey: ["clubs", params],
		queryFn: () => getClubs(params),
	});
};

export const useGetClubById = (id: string) => {
	return useQuery<Club>({
		queryKey: ["clubs", id],
		queryFn: () => getClubById(id),
	});
};

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
