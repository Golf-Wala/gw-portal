import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import WorkOrdersAnalytics from "./work-order-analytics";
import WorkOrdersTable from "./work-orders-table";

export default function WorkOrdersPage() {
	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">My Work Orders</h2>
				<Button>
					<Plus />
					Add Work Order
				</Button>
			</div>
			<WorkOrdersAnalytics />
			<WorkOrdersTable />
		</div>
	);
}
