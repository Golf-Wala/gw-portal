import {
	CLUB_CATEGORIES,
	CLUB_CONDITIONS,
	CLUB_SHAFT_FLEXES,
	CLUB_SHAFT_MATERIALS,
	CLUB_GRIP_SIZES,
	type Club,
	CLUB_DEXTERITIES,
} from "@/types/club";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "../ui/combobox";
import { GOLF_CLUB_BRANDS } from "./inventory.data";

interface Props {
	club: Club | null;
	setClub: (club: Club | null) => void;
	onSubmit?: () => void;
	isPending?: boolean;
}

export default function ClubDialog({
	club,
	setClub,
	onSubmit,
	isPending,
}: Props) {
	const newClub = !club?._id;

	function handleSubmit(e: any) {
		e.preventDefault();
		onSubmit?.();
	}

	if (!club) return null;

	return (
		<Dialog open={!!club} onOpenChange={() => setClub(null)}>
			<DialogContent className="flex max-h-[85vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
				<form
					onSubmit={handleSubmit}
					className="flex min-h-0 flex-1 flex-col"
				>
					<DialogHeader className="px-6 pt-6">
						<h3 className="text-lg font-semibold">
							{newClub ? "Add Club" : "Edit Club"}
						</h3>
						<DialogDescription>
							{newClub
								? "Fill out the form below to add a new club."
								: "Update the details of your club below."}
						</DialogDescription>
					</DialogHeader>

					<div className="min-h-0 flex-1 overflow-y-auto overscroll-auto px-6 space-y-6 py-4">
						<BasicInfoSection club={club} setClub={setClub} />
						<ShaftInfoSection club={club} setClub={setClub} />
						<GripInfoSection club={club} setClub={setClub} />
						<AdditionalAttributesSection
							club={club}
							setClub={setClub}
						/>
						<PurchaseInfoSection club={club} setClub={setClub} />
					</div>

					<DialogFooter className="border-t px-6 py-4">
						<DialogClose
							render={
								<Button
									disabled={isPending}
									type="button"
									variant="outline"
								>
									Cancel
								</Button>
							}
						/>
						<Button disabled={isPending} type="submit">
							{newClub ? "Add Club" : "Update Club"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

interface FormFieldProps {
	club: Club;
	setClub: (club: Club) => void;
}

function BasicInfoSection({ club, setClub }: FormFieldProps) {
	return (
		<section className="space-y-4">
			<h4 className="text-sm font-medium text-muted-foreground">
				Basic Info
			</h4>
			<div className="space-y-1">
				<Label htmlFor="category">Category</Label>
				<Select
					value={CLUB_CATEGORIES[club.category] ?? ""}
					onValueChange={(value) =>
						setClub({
							...club,
							category: value as Club["category"],
						})
					}
				>
					<SelectTrigger id="category" className="w-full">
						<SelectValue placeholder="Select Category" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="driver">Driver</SelectItem>
						<SelectItem value="wood">Wood</SelectItem>
						<SelectItem value="hybrid">Hybrid</SelectItem>
						<SelectItem value="utility">Utility</SelectItem>
						<SelectItem value="iron">Iron(s)</SelectItem>
						<SelectItem value="wedge">Wedge</SelectItem>
						<SelectItem value="putter">Putter</SelectItem>
						<SelectItem value="shaft">Shaft</SelectItem>
						<SelectItem value="misc">
							Miscellaneous/Other
						</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="space-y-1">
				<Label htmlFor="brand">Brand</Label>
				<Combobox
					items={GOLF_CLUB_BRANDS}
					value={club.clubBrand}
					onValueChange={(value) =>
						setClub({
							...club,
							clubBrand: value ?? "",
						})
					}
					inputValue={club.clubBrand}
					onInputValueChange={(value) =>
						setClub({
							...club,
							clubBrand: value,
						})
					}
				>
					<ComboboxInput id="brand" placeholder="Brand" required />
					<ComboboxContent>
						<ComboboxEmpty>
							No matching brand — press Enter to use it anyway.
						</ComboboxEmpty>
						<ComboboxList>
							{(brand) => (
								<ComboboxItem key={brand} value={brand}>
									{brand}
								</ComboboxItem>
							)}
						</ComboboxList>
					</ComboboxContent>
				</Combobox>
			</div>
			<div className="space-y-1">
				<Label htmlFor="model">Model</Label>
				<Input
					id="model"
					placeholder="Model"
					value={club.clubModel}
					onChange={(e) =>
						setClub({
							...club,
							clubModel: e.target.value,
						})
					}
					autoCapitalize="on"
					required
				/>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-1">
					<Label htmlFor="condition">Condition</Label>
					<Select
						value={CLUB_CONDITIONS[club.condition] ?? ""}
						onValueChange={(value) =>
							setClub({
								...club,
								condition: value as Club["condition"],
							})
						}
					>
						<SelectTrigger id="condition" className="w-full">
							<SelectValue placeholder="Select Condition" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="new">New</SelectItem>
							<SelectItem value="used">Used</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-1">
					<Label htmlFor="dexterity">Dexterity</Label>
					<Select
						value={CLUB_DEXTERITIES[club.dexterity] ?? ""}
						onValueChange={(value) =>
							setClub({
								...club,
								dexterity: value as Club["dexterity"],
							})
						}
					>
						<SelectTrigger id="dexterity" className="w-full">
							<SelectValue placeholder="Select Dexterity" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="right">Right</SelectItem>
							<SelectItem value="left">Left</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</section>
	);
}

function ShaftInfoSection({ club, setClub }: FormFieldProps) {
	const [shaftOpen, setShaftOpen] = useState(false);

	return (
		<Collapsible open={shaftOpen} onOpenChange={setShaftOpen}>
			<CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium text-muted-foreground">
				Shaft Info
				<ChevronDown
					className={`h-4 w-4 transition-transform ${
						shaftOpen ? "rotate-180" : ""
					}`}
				/>
			</CollapsibleTrigger>
			<CollapsibleContent className="space-y-4 pt-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1">
						<Label htmlFor="shaftBrand">Shaft Brand</Label>
						<Input
							id="shaftBrand"
							placeholder="Shaft Brand"
							value={club.shaftBrand ?? ""}
							onChange={(e) =>
								setClub({
									...club,
									shaftBrand: e.target.value,
								})
							}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="shaftModel">Shaft Model</Label>
						<Input
							id="shaftModel"
							placeholder="Shaft Model"
							value={club.shaftModel ?? ""}
							onChange={(e) =>
								setClub({
									...club,
									shaftModel: e.target.value,
								})
							}
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1">
						<Label htmlFor="shaftMaterial">Material</Label>
						<Select
							value={
								club?.shaftMaterial
									? (CLUB_SHAFT_MATERIALS[
											club.shaftMaterial
										] ?? "")
									: ""
							}
							onValueChange={(value) =>
								setClub({
									...club,
									shaftMaterial:
										value as Club["shaftMaterial"],
								})
							}
						>
							<SelectTrigger
								id="shaftMaterial"
								className="w-full"
							>
								<SelectValue placeholder="Select Material" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="graphite">
									Graphite
								</SelectItem>
								<SelectItem value="steel">Steel</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-1">
						<Label htmlFor="shaftFlex">Flex</Label>
						<Select
							value={
								club.shaftFlex
									? (CLUB_SHAFT_FLEXES[club.shaftFlex] ?? "")
									: ""
							}
							onValueChange={(value) =>
								setClub({
									...club,
									shaftFlex: value as Club["shaftFlex"],
								})
							}
						>
							<SelectTrigger id="shaftFlex" className="w-full">
								<SelectValue placeholder="Select Flex" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="l">Ladies (L)</SelectItem>
								<SelectItem value="a">Senior (A)</SelectItem>
								<SelectItem value="r">Regular (R)</SelectItem>
								<SelectItem value="s">Stiff (S)</SelectItem>
								<SelectItem value="x">X-Stiff (X)</SelectItem>
								<SelectItem value="tx">Tour X (TX)</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1">
						<Label htmlFor="shaftWeight">Weight (g)</Label>
						<Input
							id="shaftWeight"
							type="number"
							placeholder="Weight (g)"
							value={club.shaftWeight ?? ""}
							onChange={(e) =>
								setClub({
									...club,
									shaftWeight:
										e.target.value === ""
											? undefined
											: parseFloat(e.target.value),
								})
							}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="shaftLength">Length (in)</Label>
						<Input
							id="shaftLength"
							type="number"
							placeholder="Length (in)"
							value={club.shaftLength ?? ""}
							onChange={(e) =>
								setClub({
									...club,
									shaftLength:
										e.target.value === ""
											? undefined
											: parseFloat(e.target.value),
								})
							}
						/>
					</div>
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}

function GripInfoSection({ club, setClub }: FormFieldProps) {
	const [gripOpen, setGripOpen] = useState(false);

	return (
		<Collapsible open={gripOpen} onOpenChange={setGripOpen}>
			<CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium text-muted-foreground">
				Grip Info
				<ChevronDown
					className={`h-4 w-4 transition-transform ${
						gripOpen ? "rotate-180" : ""
					}`}
				/>
			</CollapsibleTrigger>
			<CollapsibleContent className="space-y-4 pt-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1">
						<Label htmlFor="gripBrand">Grip Brand</Label>
						<Input
							id="gripBrand"
							placeholder="Grip Brand"
							value={club.gripBrand ?? ""}
							onChange={(e) =>
								setClub({
									...club,
									gripBrand: e.target.value,
								})
							}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="gripModel">Grip Model</Label>
						<Input
							id="gripModel"
							placeholder="Grip Model"
							value={club.gripModel ?? ""}
							onChange={(e) =>
								setClub({
									...club,
									gripModel: e.target.value,
								})
							}
						/>
					</div>
				</div>

				<div className="space-y-1">
					<Label htmlFor="gripSize">Grip Size</Label>
					<Select
						value={
							club?.gripSize
								? (CLUB_GRIP_SIZES[club.gripSize] ?? "")
								: ""
						}
						onValueChange={(value) =>
							setClub({
								...club,
								gripSize: value as Club["gripSize"],
							})
						}
					>
						<SelectTrigger id="gripSize" className="w-full">
							<SelectValue placeholder="Select Grip Size" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="undersize">Undersize</SelectItem>
							<SelectItem value="standard">Standard</SelectItem>
							<SelectItem value="midsize">Midsize</SelectItem>
							<SelectItem value="jumbo">Jumbo</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}

function AdditionalAttributesSection({ club, setClub }: FormFieldProps) {
	const [attributesOpen, setAttributesOpen] = useState(false);

	return (
		<Collapsible open={attributesOpen} onOpenChange={setAttributesOpen}>
			<CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium text-muted-foreground">
				Additional Attributes
				<ChevronDown
					className={`h-4 w-4 transition-transform ${
						attributesOpen ? "rotate-180" : ""
					}`}
				/>
			</CollapsibleTrigger>
			<CollapsibleContent className="space-y-4 pt-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1">
						<Label htmlFor="playingLength">
							Playing Length (in)
						</Label>
						<Input
							id="playingLength"
							type="number"
							placeholder="Playing Length"
							value={club.playingLength ?? ""}
							onChange={(e) =>
								setClub({
									...club,
									playingLength:
										e.target.value === ""
											? undefined
											: parseFloat(e.target.value),
								})
							}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="loft">Loft (deg)</Label>
						<Input
							id="loft"
							type="number"
							placeholder="Loft"
							value={club.loft ?? ""}
							onChange={(e) =>
								setClub({
									...club,
									loft:
										e.target.value === ""
											? undefined
											: parseFloat(e.target.value),
								})
							}
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1">
						<Label htmlFor="lieAngle">Lie Angle</Label>
						<Input
							id="lieAngle"
							placeholder="Lie Angle"
							value={club.lieAngle ?? ""}
							onChange={(e) =>
								setClub({
									...club,
									lieAngle: e.target.value,
								})
							}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="setMakeup">Set Makeup</Label>
						<Input
							id="setMakeup"
							placeholder="Set Makeup"
							value={club.setMakeup ?? ""}
							onChange={(e) =>
								setClub({
									...club,
									setMakeup: e.target.value,
								})
							}
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1">
						<Label htmlFor="bounce">Bounce</Label>
						<Input
							id="bounce"
							placeholder="Bounce"
							value={club.bounce ?? ""}
							onChange={(e) =>
								setClub({
									...club,
									bounce: e.target.value,
								})
							}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="grind">Grind</Label>
						<Input
							id="grind"
							placeholder="Grind"
							value={club.grind ?? ""}
							onChange={(e) =>
								setClub({
									...club,
									grind: e.target.value,
								})
							}
						/>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Checkbox
						id="headcoverIncluded"
						checked={!!club.headcoverIncluded}
						onCheckedChange={(checked) =>
							setClub({
								...club,
								headcoverIncluded: checked === true,
							})
						}
					/>
					<Label htmlFor="headcoverIncluded">
						Headcover Included
					</Label>
				</div>

				<div className="space-y-1">
					<Label htmlFor="notes">Notes</Label>
					<Textarea
						id="notes"
						placeholder="Notes"
						value={club.notes}
						onChange={(e) =>
							setClub({
								...club,
								notes: e.target.value,
							})
						}
					/>
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}

function PurchaseInfoSection({ club, setClub }: FormFieldProps) {
	return (
		<section className="space-y-4">
			<h4 className="text-sm font-medium text-muted-foreground">
				Purchase Info
			</h4>

			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-1">
					<Label htmlFor="purchasePrice">Purchase Price</Label>
					<Input
						id="purchasePrice"
						type="number"
						placeholder="Purchase Price"
						value={club.purchasePrice}
						onChange={(e) =>
							setClub({
								...club,
								purchasePrice: parseFloat(e.target.value),
							})
						}
						required
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="listingPrice">Listing Price</Label>
					<Input
						id="listingPrice"
						type="number"
						placeholder="Listing Price"
						value={club?.listingPrice ?? ""}
						onChange={(e) =>
							setClub({
								...club,
								listingPrice: parseFloat(e.target.value),
							})
						}
					/>
				</div>
			</div>
		</section>
	);
}
