import { use, useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

import Logo from '@assets/images/pokemon-logotipo.png';
import BackgroundImg from '@assets/images/gengarbg.jpg'

import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
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
                <Card style={{ width: '100%', maxWidth: 400, alignSelf: 'center' }}>

                    {/* classe de titulo e logotipo */}
                    <div className='titulo' style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', marginBottom: 10}}>
                        <Text style={styles.title} >Bem-vindo ao</Text>
                        <Image source={Logo}/>
                    </div>
                    
                    {/* formulário */}
                    <Input 
                        placeholder="Digite o nome de usuário" 
                        onChangeText={setName} />
                    <Input 
                        placeholder="Digite a senha" 
                        secureTextEntry 
                        onChangeText={setSenha} />
                    <Button 
                        title="Entrar" 
                        onPress={validateCredentials} 
                        style={{ marginTop: 25, borderRadius: 25, width: '50%' }}/>
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
        textAlign: 'center',
    },
});
