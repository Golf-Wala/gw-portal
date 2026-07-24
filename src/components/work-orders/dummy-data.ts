import type {
	WorkOrder,
	WorkOrderStats,
	WorkOrderType,
	WorkOrderStatus,
} from "@/types";

const TYPES: WorkOrderType[] = [
	"grip_installation",
	"loft_lie_adjustment",
	"shaft_repair",
	"shaft_replacement",
	"club_fitting",
	"refinishing",
];

const STATUSES: WorkOrderStatus[] = [
	"pending",
	"in_progress",
	"completed",
	"cancelled",
];

const CLUBS: [string, string][] = [
	["Ping", "G25 Driver"],
	["Titleist", "Vokey SM9 56°"],
	["Callaway", "Big Bertha 3H"],
	["Scotty Cameron", "Studio Style Newport"],
	["Top Flite", "IHS Irons Pw-5i"],
	["Wilson", "Deep Red Driver"],
	["Odyssey", "Works Versa 1"],
	["Cobra", "King SZ Hybrid"],
	["Mizuno", "MP-20 Irons"],
	["TaylorMade", "Stealth 2 Driver"],
];

const CUSTOMERS = [
	"Jake Morrison",
	"Sarah Lindqvist",
	"Marcus Webb",
	"Priya Nair",
	"Devon Clarke",
	"Emily Sato",
	"Carlos Reyes",
	"Grace Kim",
	"Tom Bradley",
	"Alina Petrov",
];

function seededRandom(seed: number) {
	const x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}

function generateWorkOrders(count: number): WorkOrder[] {
	return Array.from({ length: count }, (_, i) => {
		const r1 = seededRandom(i * 7.1);
		const r2 = seededRandom(i * 3.3 + 1);
		const r3 = seededRandom(i * 5.7 + 2);
		const r4 = seededRandom(i * 11.3 + 3);

		const [clubBrand, clubModel] = CLUBS[Math.floor(r1 * CLUBS.length)];
		const daysAgo = Math.floor(r4 * 60);
		const createdAt = new Date(
			Date.now() - daysAgo * 24 * 60 * 60 * 1000
		).toISOString();

		return {
			_id: `wo_${i + 1}`,
			orderNumber: `WO-${String(1000 + i)}`,
			type: TYPES[Math.floor(r2 * TYPES.length)],
			clubBrand,
			clubModel,
			customerName: CUSTOMERS[Math.floor(r1 * CUSTOMERS.length)],
			price: Math.round((15 + r3 * 120) * 100) / 100,
			status: STATUSES[Math.floor(r2 * STATUSES.length)],
			createdAt,
			completedAt: null,
			notes: "",
		};
	});
}

export const DUMMY_WORK_ORDERS: WorkOrder[] = generateWorkOrders(47);

export function getWorkOrderStats(
	orders: WorkOrder[] = DUMMY_WORK_ORDERS
): WorkOrderStats {
	return {
		total: orders.length,
		pending: orders.filter((o) => o.status === "pending").length,
		inProgress: orders.filter((o) => o.status === "in_progress").length,
		completed: orders.filter((o) => o.status === "completed").length,
		totalRevenue: orders
			.filter((o) => o.status === "completed")
			.reduce((sum, o) => sum + o.price, 0),
	};
}
