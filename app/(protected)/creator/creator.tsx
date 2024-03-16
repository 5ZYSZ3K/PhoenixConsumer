import ControlledInput from "@/components/ControlledInput";
import { ScrollView, View, StyleSheet } from "react-native";
import { z } from "zod";
import { Text, IconButton } from "react-native-paper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { DatePickerInput } from "react-native-paper-dates";

const defaultValues = {
	title: "",
	description: "",
	short_description: "",
	start_timestamp: 0,
	end_timestamp: 0,
	location: "Kraków",
	price: 0,
};
const registerSchema = z.object({
	title: z.string().min(1, "Pole jest wymagane"),
	description: z.string().min(1, "Pole jest wymagane"),
	short_description: z.string().min(1, "Pole jest wymagane"),
	start_timestamp: z.number().min(1, "Pole jest wymagane"),
	end_timestamp: z.number().min(1, "Pole jest wymagane"),
	location: z.string().min(1, "Pole jest wymagane"),
	price: z.number().min(1, "Pole jest wymagane"),
});
export default function eventCreator() {
	const returnPress = () => {
		console.log("Powrót");
	};
	const { control, handleSubmit } = useForm({
		defaultValues,
		resolver: zodResolver(registerSchema),
	});
	return (
		<View style={styles.mainView}>
			<View style={styles.titleView}>
				<Text variant="displaySmall" style={styles.title}>
					Mój Profil
				</Text>
				<IconButton
					icon="arrow-left"
					mode="contained"
					size={60}
					onPress={returnPress}
				/>
			</View>
			<ScrollView>
				<View style={{ margin: 10 }}>
					<ControlledInput //title, description, short_description, start_timestamp, end_timestamp, location ,price
						control={control}
						label="Tytuł"
						name="title"
					/>
				</View>
				<View style={{ margin: 10 }}>
					<ControlledInput control={control} label="Opis" name="description" />
				</View>
				<View style={{ margin: 10 }}>
					<ControlledInput
						control={control}
						label="Krótki opis"
						name="short_description"
					/>
				</View>
				<View style={{ margin: 10 }}>
					<ControlledInput
						control={control}
						label="Początek"
						placeholder="DD/MM/YYYY"
						name="start_timestamp"
					/>
				</View>
				<View style={{ margin: 10 }}>
					<ControlledInput
						control={control}
						label="Koniec"
						placeholder="DD/MM/YYYY"
						name="end_timestamp"
					/>
				</View>
				<View style={{ margin: 10 }}>
					<ControlledInput
						control={control}
						label="Lokalizacja"
						name="location"
					/>
				</View>
				<View style={{ margin: 10 }}>
					<ControlledInput control={control} label="Cena" name="price" />
				</View>
			</ScrollView>
		</View>
	);
}
const styles = StyleSheet.create({
	title: {
		textAlign: "right",
	},
	myButton: {
		display: "flex",
	},
	titleView: {
		padding: 20,
	},
	mainView: { flex: 1 },
	button: {
		backgroundColor: "#15CA78",
		color: "#fff",
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 16,
		elevation: 4,
		// boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.15)"
	},
});
