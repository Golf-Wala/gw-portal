import { Fragment } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	XAxis,
	YAxis,
} from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetClubAnalytics } from "./analytics.query";

const currency = (n: number) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(n || 0);

const trendConfig: ChartConfig = {
	acquired: { label: "Acquired", color: "hsl(var(--chart-1))" },
	sold: { label: "Sold", color: "hsl(var(--chart-2))" },
	profit: { label: "Profit ($)", color: "hsl(var(--chart-3))" },
};

const categoryConfig: ChartConfig = {
	available: { label: "Available", color: "hsl(var(--chart-1))" },
	sold: { label: "Sold", color: "hsl(var(--chart-2))" },
};

const conditionConfig: ChartConfig = {
	count: { label: "Clubs" },
	new: { label: "New", color: "hsl(var(--chart-1))" },
	used: { label: "Used", color: "hsl(var(--chart-2))" },
};

function StatCard({
	label,
	value,
	sub,
}: {
	label: string;
	value: string | number;
	sub?: string;
}) {
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardDescription>{label}</CardDescription>
				<CardTitle className="text-2xl">{value}</CardTitle>
			</CardHeader>
			{sub && (
				<CardContent className="pt-0">
					<p className="text-xs text-muted-foreground">{sub}</p>
				</CardContent>
			)}
		</Card>
	);
}

function DashboardSkeleton() {
	return (
		<div className="mx-auto max-w-7xl space-y-8 p-6">
			<Skeleton className="h-8 w-64" />
			<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<Skeleton key={i} className="h-28 w-full" />
				))}
			</div>
			<Skeleton className="h-80 w-full" />
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<Skeleton className="h-72 w-full" />
				<Skeleton className="h-72 w-full" />
			</div>
		</div>
	);
}

export default function DashboardPage() {
	const { data, isLoading, isError, error, refetch, isFetching } =
		useGetClubAnalytics();

	if (isLoading) return <DashboardSkeleton />;

	if (isError || !data) {
		return (
			<div className="flex h-64 items-center justify-center">
				<Card className="w-full max-w-md border-destructive">
					<CardHeader>
						<CardTitle className="text-destructive">
							Couldn&apos;t load dashboard
						</CardTitle>
						<CardDescription>
							{error instanceof Error
								? error.message
								: "No data available"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<button
							onClick={() => refetch()}
							className="text-sm font-medium text-primary underline underline-offset-4"
						>
							Try again
						</button>
					</CardContent>
				</Card>
			</div>
		);
	}

	const {
		overview,
		byCategory,
		byCondition,
		byAcquisition,
		topBrands,
		monthlyTrend,
		recentSales,
	} = data;

	return (
		<div className="mx-auto max-w-7xl space-y-8 p-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">
						Inventory Dashboard
					</h1>
					<p className="text-sm text-muted-foreground">
						Overview of club inventory, sales, and performance
					</p>
				</div>
				{isFetching && (
					<span className="text-xs text-muted-foreground">
						Refreshing…
					</span>
				)}
			</div>

			{/* KPI cards */}
			<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
				<StatCard
					label="Total Clubs"
					value={overview.totalClubs}
					sub={`${overview.availableCount} available / ${overview.soldCount} sold`}
				/>
				<StatCard
					label="Inventory Value"
					value={currency(overview.inventoryValue)}
					sub="Cost basis of available stock"
				/>
				<StatCard
					label="Total Revenue"
					value={currency(overview.totalRevenue)}
					sub="From sold clubs"
				/>
				<StatCard
					label="Total Profit"
					value={currency(overview.totalProfit)}
					sub={`Sell-through: ${overview.sellThroughRate}%`}
				/>
			</div>

			{overview.avgDaysToSell !== null && (
				<p className="text-sm text-muted-foreground">
					Average time to sell:{" "}
					<span className="font-medium text-foreground">
						{overview.avgDaysToSell} days
					</span>
				</p>
			)}

			{/* Trend chart */}
			<Card>
				<CardHeader>
					<CardTitle>Acquisitions vs. Sales</CardTitle>
					<CardDescription>Trailing 12 months</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer
						config={trendConfig}
						className="h-75 w-full"
					>
						<LineChart data={monthlyTrend}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
							/>
							<YAxis
								tickLine={false}
								axisLine={false}
								tickMargin={8}
							/>
							<ChartTooltip content={<ChartTooltipContent />} />
							<ChartLegend content={<ChartLegendContent />} />
							<Line
								type="monotone"
								dataKey="acquired"
								stroke="var(--color-acquired)"
								strokeWidth={2}
								dot={false}
							/>
							<Line
								type="monotone"
								dataKey="sold"
								stroke="var(--color-sold)"
								strokeWidth={2}
								dot={false}
							/>
							<Line
								type="monotone"
								dataKey="profit"
								stroke="var(--color-profit)"
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ChartContainer>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{/* Category breakdown */}
				<Card>
					<CardHeader>
						<CardTitle>Inventory by Category</CardTitle>
						<CardDescription>
							Available vs. sold per category
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer
							config={categoryConfig}
							className="h-70 w-full"
						>
							<BarChart data={byCategory}>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="_id"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<ChartTooltip
									content={<ChartTooltipContent />}
								/>
								<ChartLegend content={<ChartLegendContent />} />
								<Bar
									dataKey="available"
									fill="var(--color-available)"
									radius={4}
								/>
								<Bar
									dataKey="sold"
									fill="var(--color-sold)"
									radius={4}
								/>
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>

				{/* Condition split */}
				<Card>
					<CardHeader>
						<CardTitle>Condition Split</CardTitle>
						<CardDescription>
							New vs. used inventory
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer
							config={conditionConfig}
							className="mx-auto aspect-square h-70"
						>
							<PieChart>
								<ChartTooltip
									content={<ChartTooltipContent />}
								/>
								<Pie
									data={byCondition}
									dataKey="count"
									nameKey="_id"
									outerRadius={100}
									label
								>
									{byCondition.map((entry) => (
										<Cell
											key={entry._id}
											fill={`var(--color-${entry._id})`}
										/>
									))}
								</Pie>
								<ChartLegend content={<ChartLegendContent />} />
							</PieChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{/* Top brands */}
				<Card>
					<CardHeader>
						<CardTitle>Top Brands</CardTitle>
						<CardDescription>By unit count</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Brand</TableHead>
									<TableHead className="text-right">
										Clubs
									</TableHead>
									<TableHead className="text-right">
										Inventory Value
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{topBrands.map((b) => (
									<TableRow key={b._id}>
										<TableCell className="font-medium">
											{b._id}
										</TableCell>
										<TableCell className="text-right">
											{b.count}
										</TableCell>
										<TableCell className="text-right">
											{currency(b.inventoryValue)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				{/* Recent sales */}
				<Card>
					<CardHeader>
						<CardTitle>Recent Sales</CardTitle>
						<CardDescription>
							Last 5 completed sales
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Club</TableHead>
									<TableHead className="text-right">
										Sold Price
									</TableHead>
									<TableHead className="text-right">
										Date
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{recentSales.map((s) => (
									<TableRow key={s._id}>
										<TableCell>
											<div className="font-medium">
												{s.clubBrand} {s.clubModel}
											</div>
											<Badge
												variant="secondary"
												className="mt-1 capitalize"
											>
												{s.category}
											</Badge>
										</TableCell>
										<TableCell className="text-right font-medium">
											{currency(s.soldPrice)}
										</TableCell>
										<TableCell className="text-right text-muted-foreground">
											{s.dateSold
												? new Date(
														s.dateSold
													).toLocaleDateString()
												: "—"}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>

			{/* Acquisition breakdown */}
			<Card>
				<CardHeader>
					<CardTitle>By Acquisition Type</CardTitle>
					<CardDescription>
						Cash, trade, or a mix of both
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Type</TableHead>
								<TableHead className="text-right">
									Count
								</TableHead>
								<TableHead className="text-right">
									Total Cost
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{byAcquisition.map((a, i) => (
								<Fragment key={a._id}>
									<TableRow>
										<TableCell className="capitalize">
											{a._id.replace("_", " + ")}
										</TableCell>
										<TableCell className="text-right">
											{a.count}
										</TableCell>
										<TableCell className="text-right">
											{currency(a.totalCost)}
										</TableCell>
									</TableRow>
									{i < byAcquisition.length - 1 && (
										<TableRow className="hover:bg-transparent">
											<TableCell
												colSpan={3}
												className="p-0"
											>
												<Separator />
											</TableCell>
										</TableRow>
									)}
								</Fragment>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
