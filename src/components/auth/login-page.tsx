import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { useAuthStore } from "./auth-store";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { isAxiosError } from "axios";
import type { User } from "@/types";

interface LoginResponse {
	user: {
		_id: string;
		role: User["role"];
		firstName: string;
		lastName: string;
		email: string;
	};
	accessToken: string;
}

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const login = useAuthStore((state) => state.login);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);

		try {
			const { data } = await api.post<LoginResponse>("/auth/login", {
				email,
				password,
			});
			login(data.accessToken, data.user);
			navigate("/", { replace: true });
		} catch (err) {
			if (isAxiosError(err) && err.response) {
				setError(
					err.response.data?.message ?? "Invalid email or password."
				);
			} else {
				setError("Something went wrong. Please try again.");
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex min-h-screen flex-col items-center justify-center bg-background"
		>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-6">
						{error && (
							<p
								role="alert"
								className="text-sm text-destructive"
							>
								{error}
							</p>
						)}
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								autoFocus
								required
								disabled={isSubmitting}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
							</div>
							<Input
								id="password"
								type="password"
								required
								disabled={isSubmitting}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button
						type="submit"
						className="w-full"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Logging in..." : "Login"}
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
