import { Edit, EllipsisVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../ui/alert-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { useGetClubs } from "./club.query";
import { useDeleteClub } from "./club.query";
import { formatCurrency } from "@/lib/utils";
import { CLUB_CATEGORIES, CLUB_ACQUISITION } from "@/types/club";
import { useClubStore } from "./club.store";
import type { Club } from "@/types/club";

export default function ClubsTable() {
	const setClub = useClubStore((s) => s.setClub);
	const { data: clubs, isPending } = useGetClubs();
	const { mutate: deleteClub, isPending: isDeleting } = useDeleteClub();

	const [clubToDelete, setClubToDelete] = useState<Club | null>(null);

	if (isPending) return <p>Loading...</p>;

	const handleConfirmDelete = () => {
		if (!clubToDelete) return;

		deleteClub(clubToDelete._id, {
			onSuccess: () => {
				setClubToDelete(null);
			},
		});
	};

	return (
		<div className="rounded border">
			<Table>
				<TableHeader>
					<TableRow className="bg-muted">
						<TableHead>Category</TableHead>
						<TableHead>Brand</TableHead>
						<TableHead>Model</TableHead>
						<TableHead>Acquisition</TableHead>
						<TableHead>Purchase Price</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{clubs?.map((club) => (
						<TableRow key={club._id}>
							<TableCell>
								{CLUB_CATEGORIES[club.category] ?? ""}
							</TableCell>
							<TableCell>{club.clubBrand}</TableCell>
							<TableCell>{club.clubModel}</TableCell>
							<TableCell>
								{CLUB_ACQUISITION[club.acquisition] ?? ""}
							</TableCell>
							<TableCell>
								{formatCurrency(club.purchasePrice)}
							</TableCell>
							<TableCell className="capitalize">
								<Badge
									variant={
										club.status === "available"
											? "default"
											: "secondary"
									}
								>
									{club.status}
								</Badge>
							</TableCell>
							<TableCell className="text-right">
								<DropdownMenu>
									<DropdownMenuTrigger
										render={
											<Button variant="ghost" size="icon">
												<EllipsisVertical />
											</Button>
										}
									/>
									<DropdownMenuContent>
										<DropdownMenuItem
											onClick={() => setClub(club)}
										>
											<Edit />
											Edit
										</DropdownMenuItem>
										<DropdownMenuItem
											variant="destructive"
											onClick={(e) => {
												e.preventDefault();
												setClubToDelete(club);
											}}
										>
											<Trash2 />
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
					{clubs?.length === 0 && (
						<TableRow>
							<TableCell colSpan={7} className="text-center">
								No clubs found.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			<AlertDialog
				open={!!clubToDelete}
				onOpenChange={(open) => !open && setClubToDelete(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Delete {clubToDelete?.clubBrand}{" "}
							{clubToDelete?.clubModel}?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently
							delete this club and remove its data from the
							server.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isDeleting}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleConfirmDelete}
							disabled={isDeleting}
						>
							{isDeleting ? "Deleting..." : "Delete"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
