import axios from "axios";
import { useAuthStore } from "@/components/auth/auth-store";
import { API_URL } from "@/constants";

export const api = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

api.interceptors.request.use((config) => {
	const token = useAuthStore.getState().accessToken;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// --- Refresh handling with a queue, so concurrent 401s don't all fire /refresh at once ---

let isRefreshing = false;
let queue: {
	resolve: (token: string) => void;
	reject: (err: unknown) => void;
}[] = [];

function processQueue(error: unknown, token: string | null = null) {
	queue.forEach(({ resolve, reject }) => {
		if (token) resolve(token);
		else reject(error);
	});
	queue = [];
}

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status !== 401 || originalRequest._retry) {
			return Promise.reject(error);
		}

		// Don't try to refresh if the 401 came from the refresh/login endpoints themselves
		if (
			originalRequest.url?.includes("/auth/refresh") ||
			originalRequest.url?.includes("/auth/login")
		) {
			useAuthStore.getState().logout();
			return Promise.reject(error);
		}

		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				queue.push({
					resolve: (token) => {
						originalRequest.headers.Authorization = `Bearer ${token}`;
						resolve(api(originalRequest));
					},
					reject,
				});
			});
		}

		originalRequest._retry = true;
		isRefreshing = true;

		try {
			const { data } = await api.post<{ accessToken: string }>(
				"/auth/refresh"
			);
			useAuthStore.getState().setAccessToken(data.accessToken);
			processQueue(null, data.accessToken);

			originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
			return api(originalRequest);
		} catch (refreshError) {
			processQueue(refreshError, null);
			useAuthStore.getState().logout();
			return Promise.reject(refreshError);
		} finally {
			isRefreshing = false;
		}
	}
);
