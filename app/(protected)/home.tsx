import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { useEffect, useState } from "react";
import Post, { postInterface } from "./post";
import api from "@/stores/api";
import MyButton from "./creator/myButton";

const renderItem = ({ item }: { item: postInterface }) => {
	return (
		<Post
			key={item.id}
			id={item.id}
			title={item.title}
			short_description={item.short_description}
			description={item.description}
			issuer_id={item.issuer_id}
			created_at={item.created_at}
			start_timestamp={item.start_timestamp}
			end_timestamp={item.end_timestamp}
			location={item.location}
			price={item.price}
			visible={item.visible}
		/>
	);
};

export default function TabOneScreen() {
	const [data, setData] = useState<Array<postInterface>>([]);

	useEffect(() => {
		async function asyncCall() {
			try {
				const fetchedData = await api.getPosts();
				setData(fetchedData); // Update state with the fetched data
			} catch (err) {
				console.error(err);
			}
		}
		asyncCall();
	}, []);

	const pressHandler = () => {
		console.log("Dzieki dziala");
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
					onPress={pressHandler}
				/>
			</View>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				extraData={data}
			/>
			<View style={styles.myButton}>
				<MyButton />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		textAlign: "right",
	},
	titleView: {
		padding: 20,
	},
	mainView: { flex: 1 },
	myButton: {
		display: "flex",
	},
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
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
