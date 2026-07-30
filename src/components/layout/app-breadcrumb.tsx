import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useLocation, Link } from "react-router-dom";
import { SidebarTrigger } from "../ui/sidebar";

const LABELS: Record<string, string> = {
	properties: "Properties",
	units: "Units",
};

export default function AppBreadcrumb() {
	const location = useLocation();

	const segments = location.pathname.split("/").filter(Boolean);
	const isHome = segments.length === 0;

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<SidebarTrigger className="text-black" />
				<BreadcrumbItem>
					{isHome ? (
						<BreadcrumbPage>Home</BreadcrumbPage>
					) : (
						<BreadcrumbLink render={<Link to="/">Home</Link>} />
					)}
				</BreadcrumbItem>
				{segments.map((segment, index) => {
					const isLast = index === segments.length - 1;

					const label =
						LABELS[segment] ??
						segment.charAt(0).toUpperCase() + segment.slice(1);

					const path = "/" + segments.slice(0, index + 1).join("/");

					return (
						<div key={path} className="flex items-center">
							<BreadcrumbSeparator />

							<BreadcrumbItem>
								{isLast ? (
									<BreadcrumbPage>{label}</BreadcrumbPage>
								) : (
									<BreadcrumbLink
										render={<Link to={path}>{label}</Link>}
									/>
								)}
							</BreadcrumbItem>
						</div>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
