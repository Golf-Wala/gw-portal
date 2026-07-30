import { Button } from "@/components/ui/button";
import { EMPTY_CLUB, type Club } from "@/types";
import TradeForm, { TradeFormBody, TradeFormFooter, TradeFormHeader } from "..";
import { useTradeStore } from "../../trade.store";
import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";
import TradeFormClubCard from "../trade-form-club-card";

export default function AppraisalStep() {
	const trade = useTradeStore((s) => s.trade);
	const setTrade = useTradeStore((s) => s.setTrade);
	const setStep = useTradeStore((s) => s.setStep);
	const setSelectedClub = useTradeStore((s) => s.setSelectedClub);

	function handleRemove(club: Club) {
		setTrade({
			...trade,
			clubsIn: (trade.clubsIn as Club[]).filter(
				(c) => c._id !== club._id
			),
		});
	}

	return (
		<TradeForm onSubmit={() => setStep("review")}>
			<TradeFormHeader title="Appraisal">
				<Button
					type="button"
					onClick={() => setSelectedClub(EMPTY_CLUB)}
					variant="secondary"
				>
					Add Club
					<PlusCircle />
				</Button>
			</TradeFormHeader>
			<TradeFormBody>
				{trade.clubsIn.map((club) => (
					<TradeFormClubCard
						key={(club as Club)._id}
						club={club as Club}
						onSelect={() => setSelectedClub(club as Club)}
						onRemove={() => handleRemove(club as Club)}
					/>
				))}
				{trade.clubsIn.length === 0 && (
					<p className="text-center text-muted-foreground">
						No clubs added yet.
					</p>
				)}
			</TradeFormBody>
			<TradeFormFooter>
				<Button
					type="button"
					variant="outline"
					onClick={() => setStep("contact")}
				>
					<ChevronLeft />
					Back: Contact
				</Button>
				<Button type="submit">
					Next: Review
					<ChevronRight />
				</Button>
			</TradeFormFooter>
		</TradeForm>
	);
}
