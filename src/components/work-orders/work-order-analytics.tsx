import { ClipboardList, Clock, DollarSign, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getWorkOrderStats } from "./dummy-data";
import { formatCurrency } from "@/lib/utils";

export default function WorkOrdersAnalytics() {
	const stats = getWorkOrderStats();

	const cards = [
		{
			label: "Total Work Orders",
			value: stats.total,
			icon: ClipboardList,
		},
		{
			label: "Pending",
			value: stats.pending,
			icon: Clock,
		},
		{
			label: "In Progress",
			value: stats.inProgress,
			icon: Wrench,
		},
		{
			label: "Total Revenue",
			value: formatCurrency(stats.totalRevenue),
			icon: DollarSign,
		},
	];

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{cards.map(({ label, value, icon: Icon }) => (
				<Card key={label}>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">
							{label}
						</CardTitle>
						<Icon className="size-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">{value}</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
