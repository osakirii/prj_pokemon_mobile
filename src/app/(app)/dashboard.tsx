import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from '@/components/button';
import { List } from '@/components/list';

import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/input';
import { useState } from 'react';
import { fetchJSON } from '@/scripts/fetchJSON';
import { Colors } from '@/constants/colors';

export default function Dashboard() {
    const { user, signOut } = useAuth();
    const [ poke, setPoke ] = useState<string>('');
    const [ pokemons, setPokemons ] = useState<any[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

    async function addPokemon(url: string) {
        if (!poke) return;
        try {
            const data = await fetchJSON(url);
            setPokemons(prev => [...prev, data]);
            setPoke('');
        } catch (err: any) {
            if (err?.status === 404) {
                setErrorMessage('Pokémon não encontrado.');
            } else {
                setErrorMessage('Erro ao buscar Pokémon.');
                console.error('Erro ao pegar JSON:', err);
            }
        } finally {
            setTimeout(() => setErrorMessage(null), 3000);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo, {user}!</Text>
            <Text style={styles.label}> Digite o nome do pokemon que deseja procurar: </Text>
            <Input
                placeholder='digite o nome do pokemon...'
                value={poke}
                onChangeText={setPoke}
            />
            {errorMessage ? (
                <Text style={{ color: 'red', marginTop: 8 }}>{errorMessage}</Text>
            ) : null}
            <Button style={{width: '50%', backgroundColor: Colors.btnSecondary}} title="Adicionar" onPress={() => {addPokemon(`https://pokeapi.co/api/v2/pokemon/${poke}`)}} />

            <List
                data={pokemons}
                onLoadMore={() => {}}
                renderItemContent={(item) => (
                    <View style={[styles.container]}>
                        <Image
                            source={item.sprites.front_default}
                            style={{ width: 80, height: 80, marginBottom: 8 }}
                        />
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text style={styles.cardText}>Tipos: {item.types?.[0]?.type?.name ?? '-'} {item.types?.[1]?.type?.name ?? '-'}</Text>
                    </View>
                )}
            />
            <Button title="Sair do Aplicativo?" onPress={signOut} />

        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        justifyContent: 'space-between',
        gap: 16,
    },
    title: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    cardText: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    label: {
        fontSize: 14,
    }
});
