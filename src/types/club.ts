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

	acquisition: "cash" | "trade" | "cash_trade";
	purchasePrice: number;
	soldPrice?: number;
	status: "available" | "sold";
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
export const CLUB_ACQUISITIONS = {
	cash: "Cash",
	trade: "Trade",
	cash_trade: "Cash + Trade",
};
export const CLUB_STATUSES = {
	available: "Available",
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
export const CLUB_ACQUISITION = {
	cash: "Cash",
	trade: "Trade",
	cash_trade: "Cash + Trade",
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

	acquisition: "cash",
	purchasePrice: 0,
	soldPrice: undefined,
	status: "available",
	dateAcquired: new Date().toISOString(),
	dateSold: undefined,

	notes: "",

	createdAt: "",
	updatedAt: "",
};
