import { Button } from "@/components/ui/button";
import TradeForm, { TradeFormBody, TradeFormFooter, TradeFormHeader } from "..";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTradeStore } from "../../trade.store";
import ClubTradeTable from "../club-trade-table";
import TradeFormClubCard from "../trade-form-club-card";
import type { Club } from "@/types";

export default function ClubTradeStep() {
	const trade = useTradeStore((s) => s.trade);
	const setStep = useTradeStore((s) => s.setStep);

	return (
		<TradeForm onSubmit={() => setStep("overview")}>
			<TradeFormHeader title="Club Trade (Optional)" />
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
