import { Image, Text, View} from "react-native";
import "@/constants/global.css";
import { router } from "expo-router";
import { Button } from "@/components/button";
import { List } from "@/components/list";
import { Colors } from "@/constants/colors";
import { styles } from "../(pokedex)/pokedex";
import { useAuth } from "@/context/AuthContext";


export default function Dashboard() {
  const { team } = useAuth();
  
  function rotear(){
    router.push({
                    pathname: "/pokedex",
                });
  }

  return (
    <View>
      <Text style={styles.title}>Time</Text>
            <List
              data={team}
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
      <Button
        title="Pokedex"
        onPress={rotear}
        style={{ marginTop: 25, borderRadius: 25, width: "50%" }}
      />
    </View>
  );
}