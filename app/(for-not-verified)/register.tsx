import {
	ActivityIndicator,
	StyleSheet,
	TouchableOpacity,
	View,
	ScrollView,
} from "react-native";
import { router } from "expo-router";

import { useForm } from "react-hook-form";
import ControlledInput from "../../components/ControlledInput";
import { useAuth } from "../../stores/auth/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CenteredLayout from "../../components/CenteredLayout/CenteredLayout";
import { Button, Text, useTheme } from "react-native-paper";

const defaultValues = {
	username: "",
	password: "",
	rePassword: "",
	phone_number: "",
	email: "",
	first_name: "",
	last_name: "",
};

const registerSchema = z
	.object({
		username: z.string().min(1, "Pole jest wymagane"),
		password: z.string().min(1, "Pole jest wymagane"),
		rePassword: z.string().min(1, "Pole jest wymagane"),
		phone_number: z.string().min(1, "Pole jest wymagane"),
		email: z.string().min(1, "Pole jest wymagane"),
		first_name: z.string().min(1, "Pole jest wymagane"),
		last_name: z.string().min(1, "Pole jest wymagane"),
	})
	.refine(({ password, rePassword }) => password === rePassword, {
		path: ["password"],
		message: "Passwords don't match",
	});

export default function TabOneScreen() {
	const theme = useTheme();
	const { control, handleSubmit } = useForm({
		defaultValues,
		resolver: zodResolver(registerSchema),
	});
	const [register, loading] = useAuth((state) => [
		state.register,
		state.loading,
	]);

	const onSubmit = async (credentials: typeof defaultValues) => {
		const { rePassword, ...rest } = credentials;
		try {
			await register(rest);
			router.replace("/home");
		} catch (err) {
			console.error(JSON.stringify(err));
		}
	};

	return (
		<ScrollView>
			<CenteredLayout title="Zarejestruj się">
				<ControlledInput
					control={control}
					label="Nazwa użytkownika"
					placeholder="anna11"
					name="username"
					iconName="account"
				/>
				<ControlledInput
					control={control}
					label="Podaj hasło"
					placeholder="hasło"
					name="password"
					iconName="key"
					secure
				/>
				<ControlledInput
					control={control}
					label="Powtórz hasło"
					placeholder="hasło"
					name="rePassword"
					iconName="key"
					secure
				/>
				<ControlledInput
					control={control}
					label="Numer telefonu"
					placeholder="123123123"
					name="phone_number"
					iconName="phone"
				/>
				<ControlledInput
					control={control}
					label="Imię"
					placeholder="Adam"
					name="first_name"
					iconName="account"
				/>
				<ControlledInput
					control={control}
					label="Nazwisko"
					placeholder="Kowalski"
					name="last_name"
					iconName="account"
				/>
				<ControlledInput
					control={control}
					label="Email"
					placeholder="adam@example.com"
					name="email"
					iconName="email"
				/>
				<View style={{ alignItems: "center", rowGap: 16 }}>
					<Button
						mode="contained-tonal"
						labelStyle={{ fontSize: 20 }}
						style={{ padding: 4 }}
						onPress={handleSubmit(onSubmit)}
					>
						Gotowe!
					</Button>
					{loading ? <ActivityIndicator /> : null}
					<TouchableOpacity style={{}} onPress={() => router.push("/login")}>
						<Text
							variant="headlineSmall"
							style={{ justifyContent: "flex-end" }}
						>
							Posiadasz konto?
						</Text>
						<Text
							variant="headlineSmall"
							style={{ fontWeight: "bold", color: theme.colors.primary }}
						>
							{"Zaloguj się"}
						</Text>
					</TouchableOpacity>
				</View>
			</CenteredLayout>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#15CA78",
		color: "#fff",
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 16,
		elevation: 4,
		// boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.15)"
	},
	buttonText: {
		color: "#fff",
	},
});
