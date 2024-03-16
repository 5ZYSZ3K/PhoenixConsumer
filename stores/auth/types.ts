export type TokensData = {
	access: string;
	refresh: string;
};

export type AuthStore = {
	access: string | null;
	refresh: string | null;
	username: string | null;
	loading: boolean;
	user: UserData | null;
	restoreTokensLoading: boolean;
	login: (credentials: CredentialsData) => Promise<void>;
	register: (credentials: CredentialsData) => Promise<void>;
	refreshToken: (token: string) => Promise<void>;
	restoreTokens: () => Promise<void>;
	editUser: (payload: UserData) => Promise<void>;
};

export type CredentialsData = {
	username: string;
	password: string;
};

export type UserData = {
	id: number;
	email: string;
};

export type RegisterData = CredentialsData & {
	re_password: string;
};
