import { View, StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

export default function CenteredLayout({ children, title }: { children: React.ReactNode; title: string }) {
    const theme = useTheme();
    return (
        <View style={{ flex: 1 }}>
            {/* Separator */}
            <View style={{ width: 20, height: 100 }} />
            <Surface elevation={4} style={{ width: '100%', padding: 8, alignItems: 'center' }}>
                <Text variant="displaySmall" style={{ color: theme.colors.primary }}>
                    {title}
                </Text>
            </Surface>
            <View style={styles.container}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        rowGap: 16,
        padding: 48,
    },
});
