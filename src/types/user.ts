export interface User {
	_id: string;
	role: "admin" | "employee";
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	createdAt: string;
	updatedAt: string;
}
