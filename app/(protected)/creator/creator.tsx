import { ScrollView, View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";
export default function eventCreator() {
	const returnPress = () => {
		console.log("Powrót");
	};
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
	mainView: {},
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
