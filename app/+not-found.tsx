import { Stack } from "expo-router";

export default function NotFoundScreen() {
	return (
		<Stack.Screen
			options={{ title: "Mamy problem. Włącz aplikację ponownie." }}
		/>
	);
}
