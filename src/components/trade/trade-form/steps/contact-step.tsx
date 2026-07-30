import { Button } from "@/components/ui/button";
import TradeForm, { TradeFormBody, TradeFormFooter, TradeFormHeader } from "..";
import { ChevronRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTradeStore } from "../../trade.store";

export default function ContactStep() {
	const trade = useTradeStore((s) => s.trade);
	const setTrade = useTradeStore((s) => s.setTrade);
	const setStep = useTradeStore((s) => s.setStep);

	return (
		<TradeForm onSubmit={() => setStep("appraisal")}>
			<TradeFormHeader title="Contact Information" />
			<TradeFormBody>
				<div className="flex items-center justify-between gap-4">
					<div className="space-y-1 w-full">
						<Label htmlFor="customerName">Customer Name:</Label>
						<Input
							id="customerName"
							name="name"
							value={trade.customerName}
							onChange={(e) =>
								setTrade({
									...trade,
									customerName: e.target.value,
								})
							}
							autoFocus
							required
						/>
					</div>
					<div className="space-y-1 w-full">
						<Label htmlFor="customerPhone">Customer Phone:</Label>
						<Input
							id="customerPhone"
							name="phone"
							value={trade.customerPhone || ""}
							onChange={(e) =>
								setTrade({
									...trade,
									customerPhone: e.target.value,
								})
							}
						/>
					</div>
				</div>
			</TradeFormBody>
			<TradeFormFooter>
				<Button type="submit">
					Next: Appraisal <ChevronRight />
				</Button>
			</TradeFormFooter>
		</TradeForm>
	);
}
