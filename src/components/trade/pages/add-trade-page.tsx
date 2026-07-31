import ClubDialog from "@/components/inventory/club-dialog";
import type { Club } from "@/types/club";
import { useTradeStore } from "../trade.store";
import AppraisalStep from "../trade-form/steps/appraisal-step";
import ContactStep from "../trade-form/steps/contact-step";
import ReviewStep from "../trade-form/steps/review-step";
import ClubTradeStep from "../trade-form/steps/club-trade-step";
import OverviewStep from "../trade-form/steps/overview-step";
import { useEffect } from "react";

const STEPS = {
	contact: <ContactStep />,
	appraisal: <AppraisalStep />,
	review: <ReviewStep />,
	"club-trade": <ClubTradeStep />,
	overview: <OverviewStep />,
};

export default function AddTradePage() {
	const trade = useTradeStore((s) => s.trade);
	const step = useTradeStore((s) => s.step);
	const club = useTradeStore((s) => s.selectedClub);
	const setClub = useTradeStore((s) => s.setSelectedClub);
	const setTrade = useTradeStore((s) => s.setTrade);
	const resetTrade = useTradeStore((s) => s.resetTrade);

	function addEditClub() {
		if (!club) return;

		const clubs = trade.clubsIn as Club[];
		const index = clubs.findIndex((c) => c._id === club._id);

		if (index >= 0) {
			const updated = [...clubs];
			updated[index] = club;
			setTrade({ ...trade, clubsIn: updated });
		} else {
			const newClub = { ...club, _id: club._id || crypto.randomUUID() };
			setTrade({
				...trade,
				clubsIn: [...clubs, newClub],
			});
		}

		setClub(null);
	}

	useEffect(() => {
		resetTrade();
	}, []);

	return (
		<>
			{STEPS[step]}
			<ClubDialog
				club={club}
				setClub={setClub}
				onSubmit={addEditClub}
				isPending={false}
			/>
		</>
	);
}
