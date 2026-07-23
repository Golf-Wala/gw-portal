import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./app-sidebar";
import AppBreadcrumb from "./app-breadcrumb";

export default function Layout() {
	return (
		<SidebarProvider className="h-screen w-screen overflow-hidden">
			<div className="flex h-screen w-full">
				<AppSidebar />
				<main className="min-w-0 flex-1 overflow-y-auto p-4 md:p-8">
					<AppBreadcrumb />
					<div className="mt-4">
						<Outlet />
					</div>
				</main>
			</div>
		</SidebarProvider>
	);
}
