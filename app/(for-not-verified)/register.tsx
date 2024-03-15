import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { router } from "expo-router";

import { useForm } from "react-hook-form";
import ControlledInput from "../../components/ControlledInput";
import { useAuth } from "../../stores/auth/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CenteredLayout from "../../components/CenteredLayout/CenteredLayout";

const defaultValues = { username: "", password: "", rePassword: "" };

const registerSchema = z
  .object({
    username: z.string().min(1, "Pole jest wymagane"),
    password: z.string().min(1, "Pole jest wymagane"),
    rePassword: z.string().min(1, "Pole jest wymagane"),
  })
  .refine(({ password, rePassword }) => password === rePassword, {
    path: ["password"],
    message: "Passwords don't match",
  });

export default function TabOneScreen() {
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: zodResolver(registerSchema),
  });
  const [register, loading] = useAuth((state) => [
    state.register,
    state.loading,
  ]);

  const onSubmit = async (credentials: typeof defaultValues) => {
    try {
      await register(credentials);
      router.replace("/edit-user");
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  };

  return (
    <CenteredLayout title="Sign up">
      <ControlledInput
        control={control}
        label="User name"
        placeholder="Enter name"
        name="username"
      />
      <ControlledInput
        control={control}
        label="Repeat password"
        placeholder="Repeat password"
        name="password"
        secure
      />
      <ControlledInput
        control={control}
        label="Repeat password"
        placeholder="Repeat password"
        name="rePassword"
        secure
      />
      <View style={{ alignItems: "flex-end", rowGap: 16 }}>
        <TouchableOpacity
          style={{ marginLeft: 4 }}
          onPress={() => router.push("/login")}
        >
          <Text style={{ color: "#10663F" }}>
            I have an account!
            <Text style={{ fontWeight: "bold", color: "#10663F" }}>
              {" Sign in"}
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Done!</Text>
        </TouchableOpacity>
        {loading ? <ActivityIndicator /> : null}
      </View>
    </CenteredLayout>
  );
}

const styles = StyleSheet.create({
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
});
