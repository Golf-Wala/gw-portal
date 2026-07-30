import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import ClubsTable from "./clubs-table";
import { useClubStore } from "./club.store";
import { EMPTY_CLUB } from "@/types";
import ClubDialog from "./club-dialog";
import { toast } from "../ui/toast";
import { useCreateClub, useUpdateClub } from "./club.query";

export default function InventoryPage() {
	const club = useClubStore((s) => s.club);
	const setClub = useClubStore((s) => s.setClub);

	const { mutate: createClub, isPending: createPending } = useCreateClub();
	const { mutate: updateClub, isPending: updatePending } = useUpdateClub();

	const newClub = !club?._id;

	function onSubmit() {
		if (!club) return;

		if (newClub) {
			createClub(club, {
				onSuccess: () => {
					toast.add({
						title: "Club added successfully.",
					});
					setClub(null);
				},
				onError: (error: any) => {
					toast.add({
						type: "error",
						title: "Error creating club",
						description:
							error?.response?.data?.message ||
							"An unknown error occurred.",
					});
				},
			});
		} else {
			updateClub(club, {
				onSuccess: () => {
					toast.add({
						title: "Club updated successfully.",
					});
					setClub(null);
				},
				onError: (error: any) => {
					toast.add({
						type: "error",
						title: "Error updating club",
						description:
							error?.response?.data?.message ||
							"An unknown error occurred.",
					});
				},
			});
		}
	}

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
			<ClubDialog
				club={club}
				setClub={setClub}
				onSubmit={onSubmit}
				isPending={createPending || updatePending}
			/>
		</div>
	);
}
