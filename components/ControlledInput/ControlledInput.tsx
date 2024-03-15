import { FieldValues, useController } from "react-hook-form";
import { ControlledInputProps } from "./types";
import React, { ReactElement } from "react";
import { TextInput, View, Text } from "react-native";

const ControlledInput = <T extends FieldValues>({
  name,
  label,
  control,
  secure,
  placeholder = "Type..."
}: ControlledInputProps<T>): ReactElement => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ control, name });

  return (
    <View style={{ width: "100%" }}>
      <Text style={{ marginLeft: 16, color: "#10663F", fontWeight: 'bold' }}>{label}</Text>
      <TextInput
        style={{
          borderRadius: 16,
          paddingHorizontal: 8,
          paddingVertical: 8,
          backgroundColor: "#E8E8E8",
          elevation: 4,
        }}
        placeholder={placeholder}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChange}
      />
      {error?.message ? <Text style={{ marginLeft: 16, color: "red" }}>{error.message}</Text> : null}
    </View>
  );
};

export default ControlledInput;
