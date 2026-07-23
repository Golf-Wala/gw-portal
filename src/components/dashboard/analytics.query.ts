import { useQuery } from "@tanstack/react-query";
import { getClubAnalytics } from "./analytics.api";

export function useGetClubAnalytics() {
	return useQuery({
		queryKey: ["analytics"],
		queryFn: () => getClubAnalytics(),
	});
}
