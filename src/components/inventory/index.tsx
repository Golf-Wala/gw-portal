import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import ClubsTable from "./clubs-table";
import { useClubStore } from "./club.store";
import { EMPTY_CLUB } from "@/types";
import ClubDialog from "./club-dialog";

export default function InventoryPage() {
	const setClub = useClubStore((s) => s.setClub);

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">My Inventory</h2>
				<Button onClick={() => setClub(EMPTY_CLUB)}>
					<Plus />
					Add Club
				</Button>
			</div>
			<ClubsTable />
			<ClubDialog />
		</div>
	);
}
