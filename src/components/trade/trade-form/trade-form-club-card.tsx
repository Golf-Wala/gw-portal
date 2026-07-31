import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { CLUB_CATEGORIES, type Club } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
	club: Club;
	onRemove?: () => void;
	onSelect?: () => void;
	price?: number;
}

export default function TradeFormClubCard({
	club,
	onRemove,
	onSelect,
	price,
}: Props) {
	return (
		<div
			onClick={onSelect}
			className="group flex items-center justify-between gap-4 rounded-lg border bg-card p-4"
		>
			<div className="min-w-0 space-y-1.5">
				<div className="flex items-center gap-2">
					<p className="font-semibold leading-none truncate">
						{club.clubBrand} {club.clubModel}
					</p>
				</div>

				<div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
					<span>{CLUB_CATEGORIES[club.category]}</span>
					<span className="text-muted-foreground/40">•</span>
					<span className="capitalize">{club.dexterity} handed</span>
					{club.shaftFlex && (
						<>
							<span className="text-muted-foreground/40">•</span>
							<span className="uppercase">
								{club.shaftFlex} flex
							</span>
						</>
					)}
				</div>
			</div>

			<div className="flex shrink-0 items-center gap-3">
				{price && (
					<span className="font-semibold font-mono">
						{formatCurrency(price)}
					</span>
				)}
				{onRemove && (
					<RemoveClubButton club={club} onRemove={onRemove} />
				)}
			</div>
		</div>
	);
}

interface RemoveClubButtonProps {
	club: Club;
	onRemove: () => void;
}
function RemoveClubButton({ club, onRemove }: RemoveClubButtonProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger
				render={
					<Button
						variant="destructive"
						size="icon-lg"
						onClick={(e) => e.stopPropagation()}
					>
						<Trash2 />
					</Button>
				}
			/>
			<AlertDialogContent onClick={(e) => e.stopPropagation()}>
				<AlertDialogHeader>
					<AlertDialogTitle>Remove this club?</AlertDialogTitle>
					<AlertDialogDescription>
						{club.clubBrand} {club.clubModel} will be removed from
						this trade. This can't be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onRemove}>
						Remove
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
