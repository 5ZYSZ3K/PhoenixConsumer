import { AxiosHeaders, AxiosResponse } from "axios";
import { client } from "./client";
import { CredentialsData, TokensData, UserData } from "../auth/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

class API {
	async login(payload: CredentialsData): Promise<TokensData> {
		const { data } = await this.request<TokensData>({
			url: "/auth/jwt/create/",
			method: "POST",
			payload,
		});

		return data;
	}

	async register(payload: CredentialsData): Promise<void> {
		await this.request(
			{
				url: "/auth/users/",
				method: "POST",
				payload,
			},
			true
		);
	}

	async refreshToken(refresh: string): Promise<{ access: string }> {
		const { data } = await this.request<TokensData>({
			url: "/auth/jwt/refresh/",
			method: "POST",
			payload: { refresh },
		});

		return data;
	}

	async verifyToken(token: string): Promise<void> {
		await this.request<void>({
			url: "/auth/jwt/verify/",
			method: "POST",
			payload: { token },
		});
	}

	async editUser(payload: UserData): Promise<void> {
		await this.request({
			payload,
			method: "PATCH",
			url: "/auth/users/me/", // temporarly
		});
	}

	async getUser(): Promise<UserData> {
		const { data } = await this.request<UserData>({
			url: "/auth/users/me/",
			method: "GET",
		});
		return data;
	}

	async request<T>(
		{
			url,
			method,
			headers,
			payload,
		}: {
			url: string;
			method: "GET" | "POST" | "PATCH";
			headers?: AxiosHeaders;
			payload?: any;
		},
		disableToken?: boolean
	): Promise<AxiosResponse<T>> {
		const accessToken = await AsyncStorage.getItem("access");

		return client.request({
			url,
			method,
			headers: {
				...(accessToken && !disableToken
					? {
							Authorization: `Bearer ${accessToken}`,
						}
					: {}),
				...headers,
			},
			data: payload,
		});
	}
}

export default new API();
