export interface Club {
	_id: string;

	category:
		| "driver"
		| "wood"
		| "hybrid"
		| "utility"
		| "iron"
		| "wedge"
		| "putter"
		| "shaft"
		| "misc";
	clubBrand: string;
	clubModel: string;
	condition: "new" | "used";
	dexterity: "left" | "right";

	shaftBrand?: string;
	shaftModel?: string;
	shaftMaterial?: "graphite" | "steel";
	shaftFlex?: "l" | "a" | "r" | "s" | "x" | "tx";
	shaftWeight?: number; // grams
	shaftLength?: number; // inches

	gripBrand?: string;
	gripModel?: string;
	gripSize?: "undersize" | "standard" | "midsize" | "jumbo";

	playingLength?: number; // inches
	loft?: number; // degrees
	lieAngle?: string;
	setMakeup?: string;
	bounce?: string;
	grind?: string;
	headcoverIncluded?: boolean;

	purchasePrice: number;
	listingPrice?: number;
	soldPrice?: number;
	status: "processing" | "available" | "sold";
	dateAcquired: string;
	dateSold?: string;

	notes: string;

	createdAt: string;
	updatedAt: string;
}

export const CLUB_CATEGORIES = {
	driver: "Driver",
	wood: "Wood",
	hybrid: "Hybrid",
	utility: "Utility",
	iron: "Iron(s)",
	wedge: "Wedge",
	putter: "Putter",
	shaft: "Shaft",
	misc: "Miscellaneous",
};
export const CLUB_CONDITIONS = {
	new: "New",
	used: "Used",
};
export const CLUB_DEXTERITIES = {
	left: "Left Handed",
	right: "Right Handed",
};
export const CLUB_STATUSES = {
	available: "Available",
	processing: "Processing",
	sold: "Sold",
};
export const CLUB_SHAFT_MATERIALS = {
	graphite: "Graphite",
	steel: "Steel",
};
export const CLUB_SHAFT_FLEXES = {
	l: "Ladies",
	a: "Senior",
	r: "Regular",
	s: "Stiff",
	x: "Extra Stiff",
	tx: "Tour Extra Stiff",
};
export const CLUB_GRIP_SIZES = {
	undersize: "Undersize",
	standard: "Standard",
	midsize: "Midsize",
	jumbo: "Jumbo",
};

export const EMPTY_CLUB: Club = {
	_id: "",

	category: "driver",
	clubBrand: "",
	clubModel: "",
	condition: "new",
	dexterity: "right",

	shaftBrand: undefined,
	shaftModel: undefined,
	shaftMaterial: undefined,
	shaftFlex: undefined,
	shaftWeight: undefined,
	shaftLength: undefined,

	gripBrand: undefined,
	gripModel: undefined,
	gripSize: undefined,

	playingLength: undefined,
	loft: undefined,
	lieAngle: undefined,
	setMakeup: undefined,
	bounce: undefined,
	grind: undefined,
	headcoverIncluded: false,

	purchasePrice: 0,
	listingPrice: undefined,
	soldPrice: undefined,
	status: "available",
	dateAcquired: new Date().toISOString(),
	dateSold: undefined,

	notes: "",

	createdAt: "",
	updatedAt: "",
};

export interface ClubAnalyticsResponse {
	overview: {
		totalClubs: number;
		availableCount: number;
		soldCount: number;
		inventoryValue: number;
		totalCost: number;
		totalRevenue: number;
		totalProfit: number;
		sellThroughRate: number;
		avgDaysToSell: number | null;
	};
	byCategory: {
		_id: string;
		count: number;
		available: number;
		sold: number;
		inventoryValue: number;
	}[];
	byCondition: {
		_id: string;
		count: number;
	}[];
	byAcquisition: {
		_id: string;
		count: number;
		totalCost: number;
	}[];
	topBrands: {
		_id: string;
		count: number;
		inventoryValue: number;
	}[];
	monthlyTrend: {
		month: string; // "YYYY-MM"
		acquired: number;
		sold: number;
		revenue: number;
		profit: number;
	}[];
	recentSales: {
		_id: string;
		clubBrand: string;
		clubModel: string;
		category: string;
		purchasePrice: number;
		soldPrice: number;
		dateSold: string; // ISO date string over the wire
	}[];
}
