import { ArrowLeftRight } from "lucide-react";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import TradesTable from "../trades-table";

export default function TradesPage() {
	const navigate = useNavigate();

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Trades</h2>
				<Button onClick={() => navigate("/trades/add")}>
					<ArrowLeftRight />
					Make Trade
				</Button>
			</div>
			<TradesTable />
		</div>
	);
}
