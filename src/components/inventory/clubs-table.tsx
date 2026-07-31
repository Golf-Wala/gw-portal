import { Edit, EllipsisVertical, Search, Trash2 } from "lucide-react";
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
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
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
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../ui/pagination";
import { useGetClubs, useUpdateClub } from "./club.query";
import { useDeleteClub } from "./club.query";
import { CLUB_CATEGORIES } from "@/types/club";
import { useClubStore } from "./club.store";
import type { Club } from "@/types/club";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "../ui/input-group";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import { formatCurrency } from "@/lib/utils";

export default function ClubsTable() {
	const setClub = useClubStore((s) => s.setClub);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");

	const { mutate: deleteClub, isPending: isDeleting } = useDeleteClub();
	const { mutate: updateClub, isPending: isUpdating } = useUpdateClub();
	const { data, isPending, isPlaceholderData } = useGetClubs(page, 10, {
		search,
	});

	const [clubToDelete, setClubToDelete] = useState<Club | null>(null);

	if (isPending) return <p>Loading...</p>;

	const clubs = data?.data ?? [];
	const totalPages = data?.pagination.totalPages ?? 1;

	const handleConfirmDelete = () => {
		if (!clubToDelete) return;

		deleteClub(clubToDelete._id, {
			onSuccess: () => {
				setClubToDelete(null);
			},
		});
	};

	function updateClubStatus(club: Club, status: Club["status"]) {
		if (club.status === status) return;
		if (isUpdating) return;
		updateClub(
			{
				...club,
				status,
			},
			{
				onSuccess: () => {
					toast.add({
						title: "Club updated",
						description: `The club ${club.clubBrand} ${club.clubModel} has been updated to status "${status}".`,
					});
				},
			}
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-end">
				<InputGroup className="max-w-md">
					<InputGroupInput
						placeholder="Search clubs..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>

					<InputGroupAddon>
						<Search />
					</InputGroupAddon>

					{isPending && (
						<InputGroupAddon align="inline-end">
							<Spinner />
						</InputGroupAddon>
					)}
				</InputGroup>
			</div>
			<div className="rounded border">
				<Table>
					<TableHeader>
						<TableRow className="bg-muted">
							<TableHead>Category</TableHead>
							<TableHead>Brand</TableHead>
							<TableHead>Model</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Purchase Price</TableHead>
							<TableHead>Listing Price</TableHead>
							<TableHead className="text-right"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{clubs.map((club) => (
							<TableRow key={club._id}>
								<TableCell>
									{CLUB_CATEGORIES[club.category] ?? ""}
								</TableCell>
								<TableCell>{club.clubBrand}</TableCell>
								<TableCell>{club.clubModel}</TableCell>
								<TableCell className="capitalize">
									<Badge
										variant={
											club.status === "available"
												? "default"
												: club.status === "processing"
													? "secondary"
													: "destructive"
										}
									>
										{club.status}
									</Badge>
								</TableCell>
								<TableCell>
									{formatCurrency(club.purchasePrice)}
								</TableCell>
								<TableCell>
									{club?.listingPrice
										? formatCurrency(club.listingPrice)
										: "N/A"}
								</TableCell>
								<TableCell className="text-right">
									<DropdownMenu>
										<DropdownMenuTrigger
											render={
												<Button
													variant="ghost"
													size="icon"
												>
													<EllipsisVertical />
												</Button>
											}
										/>
										<DropdownMenuContent>
											{club.status !== "sold" && (
												<>
													<DropdownMenuGroup>
														{club.status ===
															"available" && (
															<DropdownMenuItem
																onClick={() =>
																	updateClubStatus(
																		club,
																		"sold"
																	)
																}
															>
																Mark as sold
															</DropdownMenuItem>
														)}
													</DropdownMenuGroup>
													<DropdownMenuGroup>
														{club.status ===
															"processing" && (
															<DropdownMenuItem
																onClick={() =>
																	updateClubStatus(
																		club,
																		"available"
																	)
																}
															>
																Mark as
																available
															</DropdownMenuItem>
														)}
													</DropdownMenuGroup>
													<DropdownMenuSeparator />
												</>
											)}
											<DropdownMenuGroup>
												<DropdownMenuItem
													onClick={() =>
														setClub(club)
													}
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
											</DropdownMenuGroup>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
						{clubs.length === 0 && (
							<TableRow>
								<TableCell colSpan={9} className="text-center">
									No clubs found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>

				{totalPages > 1 && (
					<TablePagination
						page={page}
						totalPages={totalPages}
						setPage={setPage}
						isPlaceholderData={isPlaceholderData}
					/>
				)}

				<DeleteClubDialog
					club={clubToDelete}
					isOpen={!!clubToDelete}
					onClose={() => setClubToDelete(null)}
					onConfirm={handleConfirmDelete}
					isDeleting={isDeleting}
				/>
			</div>
		</div>
	);
}

function DeleteClubDialog({
	club,
	isOpen,
	onClose,
	onConfirm,
	isDeleting,
}: {
	club: Club | null;
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	isDeleting: boolean;
}) {
	if (!club) return null;

	return (
		<AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Delete {club.clubBrand} {club.clubModel}?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently
						delete this club and remove its data from the server.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
						disabled={isDeleting}
					>
						{isDeleting ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

function TablePagination({
	page,
	totalPages,
	setPage,
	isPlaceholderData,
}: {
	page: number;
	totalPages: number;
	setPage: (page: number) => void;
	isPlaceholderData: boolean;
}) {
	const goToPage = (p: number) => {
		if (p < 1 || p > totalPages) return;
		setPage(p);
	};

	// Builds a small windowed page list: 1 … p-1, p, p+1 … totalPages
	const getPageNumbers = () => {
		const pages = new Set<number>([
			1,
			totalPages,
			page - 1,
			page,
			page + 1,
		]);
		return [...pages]
			.filter((p) => p >= 1 && p <= totalPages)
			.sort((a, b) => a - b);
	};

	return (
		<div className="flex justify-center border-t py-3">
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href="#"
							onClick={(e) => {
								e.preventDefault();
								if (!isPlaceholderData) {
									goToPage(page - 1);
								}
							}}
							className={
								page === 1
									? "pointer-events-none opacity-50"
									: undefined
							}
						/>
					</PaginationItem>

					{getPageNumbers().map((p, i, arr) => (
						<div key={p} className="flex items-center">
							{i > 0 && p - arr[i - 1] > 1 && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}

							<PaginationItem>
								<PaginationLink
									href="#"
									isActive={p === page}
									onClick={(e) => {
										e.preventDefault();
										if (!isPlaceholderData) {
											goToPage(p);
										}
									}}
								>
									{p}
								</PaginationLink>
							</PaginationItem>
						</div>
					))}

					<PaginationItem>
						<PaginationNext
							href="#"
							onClick={(e) => {
								e.preventDefault();
								if (!isPlaceholderData) {
									goToPage(page + 1);
								}
							}}
							className={
								page === totalPages
									? "pointer-events-none opacity-50"
									: undefined
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
