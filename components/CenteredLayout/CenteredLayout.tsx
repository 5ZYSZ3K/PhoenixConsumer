import { View, Text, StyleSheet } from "react-native";

export default function CenteredLayout({ children, title }: { children: React.ReactNode, title: string }) {
  return (<View style={styles.container}>
  {/* Separator */}
  <View style={{ width: 20, height: 100 }} />
  <Text style={styles.title}>{title}</Text>
   {children}
</View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 16,
    padding: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#15CA78",
    fontFamily: 'Roboto'
  }
});