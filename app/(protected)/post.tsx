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
		<Card mode="contained" style={{ marginVertical: 10 }}>
			<Card.Title title={title} subtitle={short_description} />
			<Card.Actions>
				<Button>View</Button>
				<Button>Ok</Button>
			</Card.Actions>
		</Card>
	);
}
