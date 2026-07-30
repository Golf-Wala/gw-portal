interface TradeFormProps {
	children?: React.ReactNode;
	onSubmit?: (event: any) => void;
}
export default function TradeForm({ children, onSubmit }: TradeFormProps) {
	async function handleSubmit(e: any) {
		e.preventDefault();
		if (onSubmit) {
			onSubmit(e);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{children}
		</form>
	);
}

interface TradeFormHeaderProps {
	title: string;
	children?: React.ReactNode;
}
export const TradeFormHeader = ({ title, children }: TradeFormHeaderProps) => {
	return (
		<div className="flex items-center justify-between">
			<h2 className="text-2xl font-bold">{title}</h2>
			{children}
		</div>
	);
};

export const TradeFormBody = ({ children }: { children?: React.ReactNode }) => {
	return <div className="space-y-6 py-4">{children}</div>;
};

export const TradeFormFooter = ({
	children,
}: {
	children?: React.ReactNode;
}) => {
	return (
		<div className="flex items-center justify-end gap-4">{children}</div>
	);
};
