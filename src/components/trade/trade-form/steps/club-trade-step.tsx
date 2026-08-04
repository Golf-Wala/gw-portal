import { Button } from "@/components/ui/button";
import TradeForm, { TradeFormBody, TradeFormFooter, TradeFormHeader } from "..";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useTradeStore } from "../../trade.store";
import ClubTradeTable from "../club-trade-table";
import TradeFormClubCard from "../trade-form-club-card";
import { EMPTY_CLUB, type Club } from "@/types";
import { useClubStore } from "@/components/inventory/club.store";
import { useCreateClub } from "@/components/inventory/club.query";
import { toast } from "@/components/ui/toast";
import ClubDialog from "@/components/inventory/club-dialog";

export default function ClubTradeStep() {
	const club = useClubStore((s) => s.club);
	const trade = useTradeStore((s) => s.trade);
	const setStep = useTradeStore((s) => s.setStep);
	const setClub = useClubStore((s) => s.setClub);

	const { mutate: createClub, isPending } = useCreateClub();

	function onSubmit() {
		if (!club) return;

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
	}

	return (
		<TradeForm onSubmit={() => setStep("overview")}>
			<TradeFormHeader title="Club Trade (Optional)">
				<Button onClick={() => setClub(EMPTY_CLUB)}>
					<Plus />
					Add Club
				</Button>
			</TradeFormHeader>
			<TradeFormBody>
				<ClubTradeTable />
				{trade.clubsOut.length > 0 && (
					<div className="space-y-1">
						<h3 className="font-medium">Selected Clubs:</h3>
						{trade.clubsOut.map((club) => (
							<TradeFormClubCard
								key={(club as Club)._id}
								club={club as Club}
								price={
									(club as Club).listingPrice ??
									(club as Club).purchasePrice
								}
							/>
						))}
					</div>
				)}
				<ClubDialog
					club={club}
					setClub={setClub}
					onSubmit={onSubmit}
					isPending={isPending}
				/>
			</TradeFormBody>
			<TradeFormFooter>
				<Button
					type="button"
					variant="outline"
					onClick={() => setStep("review")}
				>
					<ChevronLeft />
					Back: Review
				</Button>
				<Button type="submit">
					Next: Overview
					<ChevronRight />
				</Button>
			</TradeFormFooter>
		</TradeForm>
	);
}
