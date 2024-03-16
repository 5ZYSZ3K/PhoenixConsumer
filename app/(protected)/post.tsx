import { Card, Text, Button } from "react-native-paper";

export type postInterface = {
	id: string;
	title: string;
	short_description: string;
	description: string;
	issuer_id: number;
	created_at: number;
	start_timestamp: number;
	end_timestamp: number;
	location: string;
	price: number;
	visible: boolean;
};
export default function Post({
	id,
	title,
	short_description,
	description,
	issuer_id,
	created_at,
	start_timestamp,
	end_timestamp,
	location,
	price,
	visible,
}: postInterface) {
	return (
		<Card>
			<Card.Title title={title} subtitle="Card Subtitle" />
			<Card.Content>
				<Text variant="titleLarge">Card title</Text>
				<Text variant="bodyMedium">{short_description}</Text>
			</Card.Content>
			{/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
			<Card.Actions>
				<Button>View</Button>
				<Button>Ok</Button>
			</Card.Actions>
		</Card>
	);
}
