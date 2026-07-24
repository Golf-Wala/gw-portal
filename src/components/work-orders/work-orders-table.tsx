import { EllipsisVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "../ui/table";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationLink,
	PaginationEllipsis,
} from "../ui/pagination";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from "../ui/alert-dialog";
import { formatCurrency } from "@/lib/utils";
import { DUMMY_WORK_ORDERS } from "./dummy-data";
import {
	WORK_ORDER_TYPES,
	WORK_ORDER_STATUS,
	type WorkOrder,
	type WorkOrderStatus,
} from "@/types";

const PAGE_SIZE = 10;

const STATUS_BADGE_VARIANT: Record<
	WorkOrderStatus,
	"default" | "secondary" | "destructive" | "outline"
> = {
	pending: "outline",
	in_progress: "secondary",
	completed: "default",
	cancelled: "destructive",
};

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

export default function WorkOrdersTable() {
	const [orders, setOrders] = useState<WorkOrder[]>(DUMMY_WORK_ORDERS);
	const [page, setPage] = useState(1);
	const [orderToDelete, setOrderToDelete] = useState<WorkOrder | null>(null);

	const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
	const paginatedOrders = orders.slice(
		(page - 1) * PAGE_SIZE,
		page * PAGE_SIZE
	);

	const handleConfirmDelete = () => {
		if (!orderToDelete) return;
		setOrders((prev) => prev.filter((o) => o._id !== orderToDelete._id));
		setOrderToDelete(null);
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
						<TableHead>Order #</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Club</TableHead>
						<TableHead>Customer</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{paginatedOrders.map((order) => (
						<TableRow key={order._id}>
							<TableCell className="font-medium">
								{order.orderNumber}
							</TableCell>
							<TableCell>
								{WORK_ORDER_TYPES[order.type] ?? ""}
							</TableCell>
							<TableCell>
								{order.clubBrand} {order.clubModel}
							</TableCell>
							<TableCell>{order.customerName}</TableCell>
							<TableCell>{formatDate(order.createdAt)}</TableCell>
							<TableCell>{formatCurrency(order.price)}</TableCell>
							<TableCell className="capitalize">
								<Badge
									variant={STATUS_BADGE_VARIANT[order.status]}
								>
									{WORK_ORDER_STATUS[order.status]}
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
											variant="destructive"
											onClick={(e) => {
												e.preventDefault();
												setOrderToDelete(order);
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
					{paginatedOrders.length === 0 && (
						<TableRow>
							<TableCell colSpan={8} className="text-center">
								No work orders found.
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
										goToPage(page - 1);
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
												goToPage(p);
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
										goToPage(page + 1);
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
				open={!!orderToDelete}
				onOpenChange={(open) => !open && setOrderToDelete(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Delete work order {orderToDelete?.orderNumber}?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently
							delete this work order and remove its data from the
							server.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleConfirmDelete}>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
