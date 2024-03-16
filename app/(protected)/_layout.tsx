import { useAuth } from "../../stores/auth/auth";
import { Redirect, Slot } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
/**
 * Redirect to login IF USER IS NOT AUTHENTICATED
 * Use it on protected screens
 */
export default function ProtectedLayout() {
	const [access] = useAuth((state) => [state.access]);

	if (!access) return <Redirect href="/login" />;

	return (
		<View
			style={{
				marginVertical: 70,
				marginHorizontal: 25,
				marginTop: 30,
				flex: 1,
			}}
		>
			<Slot />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
