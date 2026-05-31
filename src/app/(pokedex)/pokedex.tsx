import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "@/components/button";
import { List } from "@/components/list";

import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/input";
import { useEffect, useState } from "react";
import { fetchJSON } from "@/scripts/fetchJSON";
import { Colors } from "@/constants/colors";
import { router } from "expo-router";

const pokemonUrls = Array.from(
  { length: 150 },
  (_, index) => `https://pokeapi.co/api/v2/pokemon/${index + 1}`
);

export default function Pokedex() {
  const { user, addToTeam: addPokemonToTeam } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pokemons, setPokemons] = useState<any[]>([]);

  const loadPokemons = async () => {
    try {
      const responses = await Promise.all(
        pokemonUrls.map((url) => fetchJSON(url))
      );

      setPokemons(responses);
      setErrorMessage(null);
    } catch (err: any) {
      setErrorMessage("Erro ao buscar Pokémon.");
      console.error("Erro ao pegar JSON:", err);
    }
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  function addToTeam(pokemon: any) {
    const added = addPokemonToTeam(pokemon);

    if (!added) {
      setErrorMessage("Time completo! Remova um Pokémon para adicionar outro.");
      return;
    }

    setErrorMessage(null);
  }

  function goToDashboard() {
    router.push({ pathname: "/dashboard" });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>POKEDEX</Text>
      <Button title="Dashboard" onPress={goToDashboard} />

      <View style={{ gap: 8 }}>
        {errorMessage ? (
          <Text style={{ color: "red", marginTop: 8 }}>{errorMessage}</Text>
        ) : null}
      </View>

      <List
        data={pokemons}
        onLoadMore={() => {}}
        renderItemContent={(item) => {
          const primaryType = item.types?.[0]?.type
            ?.name as keyof typeof Colors.pokemonTypes;

          const typeColor =
            Colors.pokemonTypes[primaryType] ?? Colors.gray[500];

          return (
            <View
              style={[
                styles.container,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 12,
                },
              ]}
            >
              <Button title="Escolher!" onPress={() => addToTeam(item)} />
              <Image
                source={{ uri: item.sprites.front_default }}
                style={{ width: 80, height: 80 }}
              />

              <Text style={styles.cardTitle}>{item.name}</Text>

              <View
                style={{
                  marginTop: 8,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  backgroundColor: typeColor,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={[
                    styles.cardText,
                    {fontWeight: "bold" },
                  ]}
                >
                  {item.types?.[0]?.type?.name ?? "-"}
                  {item.types?.[1]?.type?.name
                    ? `, ${item.types[1].type.name}`
                    : ""}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "space-between",
    gap: 16,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  cardText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  label: {
    fontSize: 14,
  },
});
