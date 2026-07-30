import { Button } from "@/components/ui/button";
import TradeForm, { TradeFormBody, TradeFormFooter, TradeFormHeader } from "..";
import { useTradeStore } from "../../trade.store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Club } from "@/types";
import { formatCurrency } from "@/lib/utils";
import TradeFormClubCard from "../trade-form-club-card";
import { toast } from "@/components/ui/toast";

export default function ReviewStep() {
	const trade = useTradeStore((s) => s.trade);
	const paymentMethod = useTradeStore((s) => s.paymentMethod);
	const setStep = useTradeStore((s) => s.setStep);
	const setPaymentMethod = useTradeStore((s) => s.setPaymentMethod);

	const [cashValue, setCashValue] = useState(0);
	const [creditValue, setCreditValue] = useState(0);

	useEffect(() => {
		if (!trade) return;

		let cashTotal = 0,
			creditTotal = 0;
		for (const club of trade.clubsIn as Club[]) {
			cashTotal += club.purchasePrice;
			creditTotal += Math.floor((club.purchasePrice * 1.1) / 5) * 5;
		}
		setCashValue(cashTotal);
		setCreditValue(creditTotal);
	}, [trade]);

	function handleNext() {
		if (trade.clubsIn.length > 0 && !paymentMethod) {
			toast.add({
				title: "Please select a payment method",
				description:
					"You must select either cash or in-store credit to proceed.",
				type: "error",
			});
			return;
		}
		setStep("club-trade");
	}

	return (
		<TradeForm onSubmit={handleNext}>
			<TradeFormHeader title="Review" />
			<TradeFormBody>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div
						onClick={() => setPaymentMethod("cash")}
						className={`cursor-pointer flex flex-col gap-2 border rounded-md p-4 transition hover:bg-gray-50 hover:shadow ${paymentMethod === "cash" ? "border-blue-400 bg-blue-50 text-blue-800" : ""}`}
					>
						<p className="text-sm text-muted-foreground">
							Cash Offer:
						</p>
						<p className="text-3xl font-semibold font-mono">
							{formatCurrency(cashValue)}
						</p>
					</div>
					<div
						onClick={() => setPaymentMethod("credit")}
						className={`cursor-pointer flex flex-col gap-2 border rounded-md p-4 transition hover:bg-gray-50 hover:shadow ${paymentMethod === "credit" ? "border-green-400 bg-green-50 text-green-800" : ""}`}
					>
						<p className="text-sm text-muted-foreground">
							In-Store Credit:
						</p>
						<p className="text-3xl font-semibold font-mono">
							{formatCurrency(creditValue)}
						</p>
					</div>
				</div>
				{trade.clubsIn.length > 0 && (
					<div className="space-y-1">
						<h3 className="font-medium">Price Breakdown:</h3>
						{trade.clubsIn.map((club) => (
							<TradeFormClubCard
								key={(club as Club)._id}
								club={club as Club}
								view="customer"
							/>
						))}
					</div>
				)}
			</TradeFormBody>
			<TradeFormFooter>
				<Button
					type="button"
					variant="outline"
					onClick={() => setStep("appraisal")}
				>
					<ChevronLeft />
					Back: Appraisal
				</Button>
				<Button type="submit">
					Next: Club Trade
					<ChevronRight />
				</Button>
			</TradeFormFooter>
		</TradeForm>
	);
}
