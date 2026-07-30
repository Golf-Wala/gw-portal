import { Input } from "@/components/ui/input";
import type { Club } from "@/types";
import { useTradeStore } from "../trade.store";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useGetClubs } from "@/components/inventory/club.query";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/lib/utils";
import { CLUB_CATEGORIES, CLUB_DEXTERITIES, CLUB_CONDITIONS } from "@/types";

export default function ClubTradeTable() {
	const [search, setSearch] = useState("");
	const { data, isPending } = useGetClubs(1, 10, {
		search,
		status: "available",
	});
	const clubs = data?.data ?? [];

	const trade = useTradeStore((s) => s.trade);
	const setTrade = useTradeStore((s) => s.setTrade);

	const selectedIds = new Set(
		trade.clubsOut.map((club) => (club as Club)._id)
	);

	const toggleClub = (club: Club) => {
		const isSelected = selectedIds.has(club._id);
		const clubsOut = isSelected
			? trade.clubsOut.filter((c) => (c as Club)._id !== club._id)
			: [...trade.clubsOut, club];

		setTrade({ ...trade, clubsOut: clubsOut as Club[] });
	};

	if (isPending) return <p>Loading...</p>;

	return (
		<div className="space-y-2">
			<Input
				placeholder="Search for a club..."
				className="w-1/3"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div className="border rounded">
				<Table>
					<TableHeader>
						<TableRow className="bg-muted">
							<TableHead></TableHead>
							<TableHead>Brand</TableHead>
							<TableHead>Model</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Dexterity</TableHead>
							<TableHead>Condition</TableHead>
							<TableHead>Listing Price</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{clubs.map((club) => {
							const isSelected = selectedIds.has(club._id);

							return (
								<TableRow
									key={club._id}
									className="cursor-pointer"
									data-state={
										isSelected ? "selected" : undefined
									}
									onClick={() => toggleClub(club)}
								>
									<TableCell
										onClick={(e) => e.stopPropagation()}
									>
										<Checkbox
											checked={isSelected}
											onCheckedChange={() =>
												toggleClub(club)
											}
										/>
									</TableCell>
									<TableCell>{club.clubBrand}</TableCell>
									<TableCell>{club.clubModel}</TableCell>
									<TableCell>
										{CLUB_CATEGORIES[club.category]}
									</TableCell>
									<TableCell>
										{CLUB_DEXTERITIES[club.dexterity]}
									</TableCell>
									<TableCell>
										{CLUB_CONDITIONS[club.condition]}
									</TableCell>
									<TableCell>
										{formatCurrency(
											club.listingPrice ??
												club.purchasePrice
										)}
									</TableCell>
								</TableRow>
							);
						})}

						{clubs.length === 0 && (
							<TableRow>
								<TableCell colSpan={9} className="text-center">
									No clubs found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
