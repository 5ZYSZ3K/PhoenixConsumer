import { create } from "zustand";
import { AuthStore, CredentialsData, UserData } from "./types";
import API from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { verifyAccessToken } from "./utils";
import { router } from "expo-router";

export const useAuth = create<AuthStore>((set) => ({
	access: null,
	refresh: null,
	username: null,
	loading: false,
	checkedAccessInStorage: false,
	restoreTokensLoading: false,
	user: null,

	login: async (credentials: CredentialsData) => {
		set({ loading: true });
		try {
			const tokens = await API.login({
				username: credentials.username,
				password: credentials.password,
			});
			AsyncStorage.setItem("access", tokens.access);
			AsyncStorage.setItem("refresh", tokens.refresh);
			const userData = await API.getUser();
			set({
				...tokens,
				user: userData,
			});
			router.replace("/");
		} finally {
			set({ loading: false });
		}
	},

	editUser: async (payload: UserData) => {
		set({ user: payload });
		API.editUser(payload);
	},

	register: async (credentials: CredentialsData) => {
		set({ loading: true });
		try {
			await API.register({
				username: credentials.username,
				password: credentials.password,
			});
			const tokens = await API.login({
				username: credentials.username,
				password: credentials.password,
			});
			AsyncStorage.setItem("access", tokens.access);
			AsyncStorage.setItem("refresh", tokens.refresh);
			const userData = await API.getUser();
			set({
				access: tokens.access,
				refresh: tokens.refresh,
				restoreTokensLoading: false,
				user: userData,
			});
			router.replace("/");
		} finally {
			set({ loading: false });
		}
	},

	refreshToken: async (refresh: string) => {
		set({ loading: true });
		try {
			const { access } = await API.refreshToken(refresh);
			AsyncStorage.setItem("access", access);
			set({ access });
		} catch {
			set({ access: null, refresh: null });
		} finally {
			set({ loading: false });
		}
	},

	restoreTokens: async () => {
		set({ restoreTokensLoading: true });
		const access = await AsyncStorage.getItem("access");
		const refresh = await AsyncStorage.getItem("refresh");

		if (!refresh) {
			set({ restoreTokensLoading: false });
			return;
		}

		const verifiedAccess = await verifyAccessToken(access);
		if (verifiedAccess) {
			const userData = await API.getUser();
			set({
				access: verifiedAccess,
				refresh,
				restoreTokensLoading: false,
				user: userData,
			});
			return;
		}

		try {
			const { access } = await API.refreshToken(refresh);
			AsyncStorage.setItem("access", access);
			const userData = await API.getUser();
			set({
				access,
				refresh,
				restoreTokensLoading: false,
				user: userData,
			});
		} catch {
			set({ restoreTokensLoading: false });
		}
	},
}));
