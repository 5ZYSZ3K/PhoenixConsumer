import { router } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import { IconButton } from "react-native-paper";
export default function MyButton() {
	const pressHandler = () => {
		router.push("/creator/creator");
	};
	return (
		<View style={styles.background}>
			<IconButton
				icon="plus"
				size={60}
				style={styles.create}
				onPress={pressHandler}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	create: {},
	background: {
		backgroundColor: "#00A271",
		width: "100%",
		height: "100%",
		padding: 40,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		marginTop: 20,
		display: "flex",
		justifyContent: "center",
	},
});
