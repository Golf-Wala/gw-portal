import { api } from "@/lib/api";
import type { ClubAnalyticsResponse } from "@/types";

export const getClubAnalytics = async () => {
	const { data } = await api.get<ClubAnalyticsResponse>("/clubs/analytics");
	return data;
};
