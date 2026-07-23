import { api } from "@/lib/api";

export interface ClubAnalyticsOverview {
	totalClubs: number;
	availableCount: number;
	soldCount: number;
	inventoryValue: number;
	totalCost: number;
	totalRevenue: number;
	totalProfit: number;
	sellThroughRate: number;
	avgDaysToSell: number | null;
}

export interface ClubCategoryBreakdown {
	_id: string;
	count: number;
	available: number;
	sold: number;
	inventoryValue: number;
}

export interface ClubConditionBreakdown {
	_id: string;
	count: number;
}

export interface ClubAcquisitionBreakdown {
	_id: string;
	count: number;
	totalCost: number;
}

export interface ClubTopBrand {
	_id: string;
	count: number;
	inventoryValue: number;
}

export interface ClubMonthlyTrend {
	month: string; // "YYYY-MM"
	acquired: number;
	sold: number;
	revenue: number;
	profit: number;
}

export interface ClubRecentSale {
	_id: string;
	clubBrand: string;
	clubModel: string;
	category: string;
	purchasePrice: number;
	soldPrice: number;
	dateSold: string; // ISO date string over the wire
}

export interface ClubAnalyticsResponse {
	overview: ClubAnalyticsOverview;
	byCategory: ClubCategoryBreakdown[];
	byCondition: ClubConditionBreakdown[];
	byAcquisition: ClubAcquisitionBreakdown[];
	topBrands: ClubTopBrand[];
	monthlyTrend: ClubMonthlyTrend[];
	recentSales: ClubRecentSale[];
}

export const getClubAnalytics = async () => {
	const { data } = await api.get<ClubAnalyticsResponse>("/analytics");
	return data;
};
