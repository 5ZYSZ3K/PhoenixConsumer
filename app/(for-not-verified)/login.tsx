import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import ControlledInput from '../../components/ControlledInput';
import { useAuth } from '../../stores/auth/auth';
import { CredentialsData } from '../../stores/auth/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CenteredLayout from '../../components/CenteredLayout/CenteredLayout';
import { Button } from 'react-native-paper';

const defaultValues = { username: '', password: '' };

const loginSchema = z.object({
    username: z.string().min(1, 'Pole jest wymagane'),
    password: z.string().min(1, 'Pole jest wymagane'),
});

export default function TabOneScreen() {
    const theme = useTheme();
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
        <CenteredLayout title="Zaloguj się">
            <ControlledInput placeholder="ania@adres.com" control={control} label="Nazwa użytkownika" name="username" />
            <ControlledInput control={control} label="Hasło" name="password" placeholder="Podaj hasło" secure />
            <View style={{ alignItems: 'center', rowGap: 16 }}>
                <TouchableOpacity style={{}} onPress={() => router.push('/register')}>
                    <Text variant="headlineSmall" style={{ justifyContent: 'flex-end' }}>
                        Nie posiadasz konta?
                        <Text style={{ fontWeight: 'bold', color: theme.colors.secondary }}>{' Zarejestruj się'}</Text>
                    </Text>
                </TouchableOpacity>
                <Button mode="contained-tonal" onPress={handleSubmit(onSubmit)}>
                    Gotowe
                </Button>
                {loading ? <ActivityIndicator /> : null}
            </View>
        </CenteredLayout>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#15CA78',
        color: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        elevation: 4,
        // boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.15)"
    },
    buttonText: {
        color: '#fff',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
