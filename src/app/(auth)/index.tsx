import { use, useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

import Logo from '@assets/images/moon.png';
import BackgroundImg from '@assets/images/gengarbg.jpg'

import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Card } from '@/components/card';
import { Alert } from '@/components/alert';   
import { Icon } from '@/components/icon';

export default function Index() {
    const [name, setName] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertData, setAlertData] = useState({ 
        title: '', 
        message: '',
        type: 'success' as 'success' | 'error' | 'warning' | 'info',
    });

    const { signIn } = useAuth();

    function validateCredentials() {
        if(name === 'resenha' && senha === 'confirmada') {
            signIn(name);

            router.push({
                pathname: '/dashboard',
                params: { username: name } 
            });
        } else {
            setAlertData({
                title: 'Erro de Login',
                message: 'Credenciais inválidas. Tente novamente.',
                type: 'error',
            });
            setIsAlertVisible(true);
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={BackgroundImg} 
                style={[styles.container, {width: '100%', height: '100%'}]}>
                <Card style={{ width: '100%', maxWidth: 1200 }}>
                    <Icon name={Logo} size={200} />
                    <Input 
                        placeholder="Usuario" 
                        onChangeText={setName} />
                    <Input 
                        placeholder="Senha" 
                        secureTextEntry 
                        onChangeText={setSenha} />
                    <Button 
                        title="Enviar" 
                        onPress={validateCredentials} 
                        style={{ marginTop: 20, width: '50%' }}/>
                </Card>
            </ImageBackground>

            <Alert 
                title={alertData.title}
                message={alertData.message}
                type={alertData.type}
                visible={isAlertVisible}
                onClose={() => setIsAlertVisible(false)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        padding: 32,
        justifyContent: 'center',
        gap: 16,
    },
    title: {
        color: '#333',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 26,
    },
});
