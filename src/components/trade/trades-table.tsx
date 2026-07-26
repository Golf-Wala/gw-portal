import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import type { Trade } from "@/types";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { useDeleteTrade, useGetTrades } from "./trade.query";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { EllipsisVertical, Trash2 } from "lucide-react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../ui/pagination";
import {
	AlertDialog,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogTitle,
	AlertDialogContent,
	AlertDialogAction,
} from "../ui/alert-dialog";

export default function TradesTable() {
	const [page, setPage] = useState(1);

	const { data, isPending, isPlaceholderData } = useGetTrades(page, 10);
	const { mutate: deleteTrade, isPending: isDeleting } = useDeleteTrade();

	const [tradeToDelete, setTradeToDelete] = useState<Trade | null>(null);

	if (isPending) return <p>Loading...</p>;

	const trades = data?.data ?? [];
	const totalPages = data?.pagination.totalPages ?? 1;

	const handleConfirmDelete = () => {
		if (!tradeToDelete) return;

		deleteTrade(tradeToDelete._id, {
			onSuccess: () => {
				setTradeToDelete(null);
			},
		});
	};

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
		<div className="rounded border">
			<Table>
				<TableHeader>
					<TableRow className="bg-muted">
						<TableHead>Customer</TableHead>
						<TableHead>Contact Info</TableHead>
						<TableHead>Clubs In</TableHead>
						<TableHead>Clubs Out</TableHead>
						<TableHead>Cash</TableHead>
						<TableHead className="text-right"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{trades.map((trade) => (
						<TableRow key={trade._id}>
							<TableCell>{trade.customerName}</TableCell>
							<TableCell>{trade.customerContact}</TableCell>
							<TableCell>{trade.clubsIn.length}</TableCell>
							<TableCell>{trade.clubsOut.length}</TableCell>
							<TableCell>{formatCurrency(trade.cash)}</TableCell>
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
											variant="destructive"
											onClick={(e) => {
												e.preventDefault();
												setTradeToDelete(trade);
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
					{trades.length === 0 && (
						<TableRow>
							<TableCell colSpan={7} className="text-center">
								No trades found.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			{totalPages > 1 && (
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
			)}

			<AlertDialog
				open={!!tradeToDelete}
				onOpenChange={(open) => !open && setTradeToDelete(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Delete {tradeToDelete?.customerName}?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently
							delete this trade and remove its data from the
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
