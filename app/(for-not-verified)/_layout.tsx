import { useAuth } from "../../stores/auth/auth";
import { Redirect, Slot } from "expo-router";
/**
 * Redirect to main screen if user IS AUTHORIZED
 * Use it on protected screens
 */
export default function ProtectedLayout() {
  const [access] = useAuth((state) => [state.access]);

  if (access) return <Redirect href="/" />;

  return <Slot />;
}
