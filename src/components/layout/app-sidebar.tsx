import {
	ChevronsUpDown,
	LayoutDashboard,
	LogOut,
	ReceiptText,
	ShelvingUnit,
	ArrowLeftRight,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuthStore } from "../auth/auth-store";

const PAGES = [
	{
		name: "Dashboard",
		location: "/",
		icon: LayoutDashboard,
	},
	{
		name: "Inventory",
		location: "/inventory",
		icon: ShelvingUnit,
	},
	{
		name: "Work Orders",
		location: "/work-orders",
		icon: ReceiptText,
	},
	{
		name: "Trades",
		location: "/trades",
		icon: ArrowLeftRight,
	},
];

export default function AppSidebar() {
	const navigate = useNavigate();
	const firstName = useAuthStore((s) => s.user?.firstName);

	return (
		<Sidebar>
			<SidebarHeader className="border-b px-4 py-3">
				<h2 className="text-lg font-semibold">Golf Wala</h2>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{PAGES.map((page) => (
								<SidebarMenuItem key={page.location}>
									<NavLink
										to={page.location}
										end={page.location === "/"}
									>
										{({ isActive }) => (
											<SidebarMenuButton
												isActive={isActive}
												render={
													<span>
														<page.icon />
														<span>{page.name}</span>
													</span>
												}
											/>
										)}
									</NavLink>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="border-t">
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton>
								{firstName ? `Hi, ${firstName}` : "Account"}
								<ChevronsUpDown className="ml-auto" />
							</SidebarMenuButton>
						}
					/>
					<DropdownMenuContent className="w-[--radix-popper-anchor-width]">
						<DropdownMenuItem onClick={() => navigate("/logout")}>
							<LogOut />
							<span>Log Out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
