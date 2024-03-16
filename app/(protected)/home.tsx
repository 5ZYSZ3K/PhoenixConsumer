import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { useEffect } from "react";
import szczala from "../../assets/images/szczala.png";
import Post from "./post";

const getPosts = async () => {
	try {
		const response = await fetch("http://127.0.0.1:8000/api/swagger/posts", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		const json = await response.json();
		return json;
	} catch (error) {
		console.error(error);
	}
};

const posts = [
	{
		id: 0,
		title: "Mycie okien",
		short_description: "umyjcie okna srata pierdata",
		description: "umyjcie okna plox plox plox szybciutko",
		issuer_id: 0,
		created_at: 1710595735,
		start_timestamp: 1710595735,
		end_timestamp: 1710595765,
		location: "Kraków, Dębniki",
		price: 0,
		visible: true,
	},
	{
		id: 1,
		title: "Granie w szachy z dziadkiem",
		short_description: "Granie w szachy z dziadkiem srata pierdata",
		description: "Granie w szachy z dziadkiem plox plox plox szybciutko",
		issuer_id: 2,
		created_at: 1710595735,
		start_timestamp: 1710595735,
		end_timestamp: 1710595765,
		location: "Kraków, Nowa Huta",
		price: 3,
		visible: true,
	},
	{
		id: 2,
		title: "Granie w szachy z dziadkiem",
		short_description: "Granie w szachy z dziadkiem srata pierdata",
		description: "Granie w szachy z dziadkiem plox plox plox szybciutko",
		issuer_id: 2,
		created_at: 1710595735,
		start_timestamp: 1710595735,
		end_timestamp: 1710595765,
		location: "Kraków, Nowa Huta",
		price: 3,
		visible: true,
	},
	{
		id: 3,
		title: "Granie w szachy z dziadkiem",
		short_description: "Granie w szachy z dziadkiem srata pierdata",
		description: "Granie w szachy z dziadkiem plox plox plox szybciutko",
		issuer_id: 2,
		created_at: 1710595735,
		start_timestamp: 1710595735,
		end_timestamp: 1710595765,
		location: "Kraków, Nowa Huta",
		price: 3,
		visible: true,
	},
	{
		id: 4,
		title: "Granie w szachy z dziadkiem",
		short_description: "Granie w szachy z dziadkiem srata pierdata",
		description: "Granie w szachy z dziadkiem plox plox plox szybciutko",
		issuer_id: 2,
		created_at: 1710595735,
		start_timestamp: 1710595735,
		end_timestamp: 1710595765,
		location: "Kraków, Nowa Huta",
		price: 3,
		visible: true,
	},
];
export default function TabOneScreen() {
	useEffect(() => {
		const data = getPosts();
		console.log(data);
	});
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
					icon={szczala}
					size={60}
					onPress={pressHandler}
				></IconButton>
			</View>
			<ScrollView>
				{posts.map((item) => {
					return (
						<Post
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
				})}
			</ScrollView>
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
	buttonText: {
		color: "#fff",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
