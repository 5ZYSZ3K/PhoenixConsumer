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
import { CredentialsData } from "../../stores/auth/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CenteredLayout from "../../components/CenteredLayout/CenteredLayout";

const defaultValues = { username: "", password: "" };

const loginSchema = z.object({
  username: z.string().min(1, "Pole jest wymagane"),
  password: z.string().min(1, "Pole jest wymagane"),
});

export default function TabOneScreen() {
  const { control, handleSubmit, setError } = useForm({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });
  const [login, loading] = useAuth((state) => [state.login, state.loading]);
  const onSubmit = async (credentials: CredentialsData) => {
    try {
      await login(credentials);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CenteredLayout title="Sign in">
      <ControlledInput
        placeholder="Enter name"
        control={control}
        label="User name"
        name="username"
      />
      <ControlledInput
        control={control}
        label="Password"
        name="password"
        placeholder="Enter password"
        secure
      />
      <View style={{ alignItems: "flex-end", rowGap: 16 }}>
        <TouchableOpacity style={{}} onPress={() => router.push("/register")}>
          <Text style={{ color: "#10663F", justifyContent: "flex-end" }}>
            Don't have an account?
            <Text style={{ fontWeight: "bold", color: "#10663F" }}>
              {" Sign up"}
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Enter</Text>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
