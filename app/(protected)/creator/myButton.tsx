import { router } from "expo-router";
import { View, StyleSheet } from "react-native";
import { IconButton, Text } from "react-native-paper";
export default function MyButton() {
	const pressHandler = () => {
		router.push("/creator/creator");
	};
	return (
		<View style={styles.background}>
			<IconButton
				icon="plus"
				size={60}
				iconColor="white"
				style={styles.create}
				onPress={pressHandler}
			/>
			<Text
				variant="displayLarge"
				style={{ marginLeft: 25, color: "white", alignSelf: "center" }}
			>
				Dodaj post
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	create: {
		backgroundColor: "#004A33",
	},
	background: {
		backgroundColor: "#00A271",
		width: "100%",
		padding: 40,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		marginTop: 20,
		display: "flex",
		justifyContent: "center",
		flexDirection: "row",
		alignContent: "center",
	},
});
