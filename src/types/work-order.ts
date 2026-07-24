export type WorkOrderType =
	| "grip_installation"
	| "loft_lie_adjustment"
	| "shaft_repair"
	| "shaft_replacement"
	| "club_fitting"
	| "refinishing"
	| "other";

export const WORK_ORDER_TYPES: Record<WorkOrderType, string> = {
	grip_installation: "Grip Installation",
	loft_lie_adjustment: "Loft/Lie Adjustment",
	shaft_repair: "Shaft Repair",
	shaft_replacement: "Shaft Replacement",
	club_fitting: "Club Fitting",
	refinishing: "Refinishing",
	other: "Other",
};

export type WorkOrderStatus =
	| "pending"
	| "in_progress"
	| "completed"
	| "cancelled";

export const WORK_ORDER_STATUS: Record<WorkOrderStatus, string> = {
	pending: "Pending",
	in_progress: "In Progress",
	completed: "Completed",
	cancelled: "Cancelled",
};

export interface WorkOrder {
	_id: string;
	orderNumber: string;
	type: WorkOrderType;
	clubBrand: string;
	clubModel: string;
	customerName: string;
	price: number;
	status: WorkOrderStatus;
	createdAt: string;
	completedAt?: string | null;
	notes?: string;
}

export interface WorkOrderStats {
	total: number;
	pending: number;
	inProgress: number;
	completed: number;
	totalRevenue: number;
}
