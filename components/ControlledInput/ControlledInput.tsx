import { FieldValues, useController } from "react-hook-form";
import { ControlledInputProps } from "./types";
import React, { ReactElement } from "react";
import { View } from "react-native";
import { TextInput, Text } from "react-native-paper";

const ControlledInput = <T extends FieldValues>({
	name,
	label,
	control,
	secure,
	placeholder = "Type...",
}: ControlledInputProps<T>): ReactElement => {
	const {
		field: { value, onChange },
		fieldState: { error },
	} = useController({ control, name });

	return (
		<View style={{ width: "100%" }}>
			<Text variant="headlineSmall" style={{ marginLeft: 16, marginBottom: 8 }}>
				{label}
			</Text>
			<TextInput
				mode="outlined"
				placeholder={placeholder}
				secureTextEntry={secure}
				value={value}
				onChangeText={onChange}
			/>
			{error?.message ? (
				<Text style={{ marginLeft: 16, color: "red" }}>{error.message}</Text>
			) : null}
		</View>
	);
};

export default ControlledInput;
