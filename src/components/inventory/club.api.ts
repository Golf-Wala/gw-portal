import { api } from "@/lib/api";
import type { Club } from "@/types";

export const getClubs = async (params?: Record<string, unknown>) => {
	const { data } = await api.get<Club[]>("/clubs", {
		params,
	});
	return data;
};

export const getClubById = async (id: string) => {
	const { data } = await api.get<Club>(`/clubs/${id}`);
	return data;
};

export const createClub = async (club: Partial<Club>) => {
	const { data } = await api.post<Club>("/clubs", club);
	return data;
};

export const updateClub = async (club: Partial<Club>) => {
	const { data } = await api.put<Club>(`/clubs/${club._id}`, club);
	return data;
};

export const deleteClub = async (id: string) => {
	const { data } = await api.delete(`/clubs/${id}`);
	return data;
};
