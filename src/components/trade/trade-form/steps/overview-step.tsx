import { Button } from "@/components/ui/button";
import TradeForm, { TradeFormBody, TradeFormFooter, TradeFormHeader } from "..";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTradeStore } from "../../trade.store";
import { formatCurrency } from "@/lib/utils";
import type { Club } from "@/types/club";
import TradeFormClubCard from "../trade-form-club-card";
import { useEffect, useState } from "react";
import {
	useCreateClub,
	useUpdateClub,
} from "@/components/inventory/club.query";
import { useCreateTrade } from "../../trade.query";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";

export default function OverviewStep() {
	const navigate = useNavigate();
	const trade = useTradeStore((s) => s.trade);
	const paymentMethod = useTradeStore((s) => s.paymentMethod);
	const setStep = useTradeStore((s) => s.setStep);
	const setTrade = useTradeStore((s) => s.setTrade);
	const resetTrade = useTradeStore((s) => s.resetTrade);

	const createClub = useCreateClub();
	const updateClub = useUpdateClub();
	const createTrade = useCreateTrade();

	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit() {
		setIsLoading(true);

		try {
			const createdClubsIn = await Promise.all(
				(trade.clubsIn as Club[]).map((club) =>
					createClub.mutateAsync(club)
				)
			);

			const updatedClubsOut = await Promise.all(
				(trade.clubsOut as Club[]).map((club) =>
					updateClub.mutateAsync({
						...club,
						status: "sold",
					})
				)
			);

			await createTrade.mutateAsync({
				customerName: trade.customerName,
				customerPhone: trade.customerPhone,
				clubsIn: createdClubsIn.map((club) => club._id),
				clubsOut: updatedClubsOut.map((club) => club._id),
				cash: trade.cash,
				notes: trade.notes,
			});

			toast.add({
				title: "Trade Created",
				type: "success",
			});
			resetTrade();
			navigate("/trades");
		} catch (error: any) {
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		if (!trade) return;

		let clubsInValue = 0;
		for (const club of trade.clubsIn as Club[]) {
			clubsInValue += club.purchasePrice;
		}
		if (paymentMethod === "credit") {
			clubsInValue = Math.floor((clubsInValue * 1.1) / 5) * 5;
		}

		let clubsOutValue = 0;
		for (const club of trade.clubsOut as Club[]) {
			clubsOutValue += club?.listingPrice ?? club.purchasePrice;
		}

		setTrade({
			...trade,
			cash: clubsOutValue - clubsInValue,
		});
	}, [trade.clubsIn, trade.clubsOut, paymentMethod]);

	return (
		<TradeForm onSubmit={handleSubmit}>
			<TradeFormHeader title="Overview" />
			<TradeFormBody>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="border rounded-md p-4 space-y-4">
						<p>Clubs Brought In:</p>
						<h3 className="text-3xl font-bold font-mono">
							{trade.clubsIn.length}
						</h3>
					</div>
					<div className="border rounded-md p-4 space-y-4">
						<p>Player Receives:</p>
						<h3 className="text-3xl font-bold font-mono">
							{trade.clubsOut.length}
						</h3>
					</div>
					<div className="border border-green-800 text-green-800 bg-green-50 rounded-md p-4 space-y-4">
						<p>
							{trade.cash > 0
								? "Customer Owes:"
								: "Customer Receives:"}
						</p>
						<h3 className="text-3xl font-bold font-mono">
							{formatCurrency(Math.abs(trade.cash))}
						</h3>
					</div>
				</div>
				<div className="space-y-1">
					<h3 className="font-medium">
						Clubs In ({trade.clubsIn.length})
					</h3>
					{trade.clubsIn.map((club) => (
						<TradeFormClubCard
							key={(club as Club)._id}
							club={club as Club}
							view="customer"
						/>
					))}
				</div>
				<div className="space-y-1">
					<h3 className="font-medium">
						Clubs Out ({trade.clubsOut.length})
					</h3>
					{trade.clubsOut.map((club) => (
						<TradeFormClubCard
							key={(club as Club)._id}
							club={club as Club}
							view="business"
						/>
					))}
				</div>
				<div className="space-y-1">
					<Label htmlFor="notes">Notes</Label>
					<Textarea
						value={trade.notes}
						onChange={(e) =>
							setTrade({ ...trade, notes: e.target.value })
						}
						id="notes"
						placeholder="Add any notes about the trade..."
					/>
				</div>
			</TradeFormBody>
			<TradeFormFooter>
				<Button
					type="button"
					variant="outline"
					onClick={() => setStep("club-trade")}
					disabled={isLoading}
				>
					<ChevronLeft />
					Back: Club Trade
				</Button>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Submitting..." : "Submit Trade"}
					<ChevronRight />
				</Button>
			</TradeFormFooter>
		</TradeForm>
	);
}
