import { Text, View} from "react-native";
import "@/constants/global.css";
import { router } from "expo-router";
import { Button } from "@/components/button";

// TODO: Implementar nativewind

export default function Dashboard() {
  
  function rotear(){
    router.push({
                    pathname: '/pokedex',
                });
  }

  return (
    <View>
      <h1>Dashboard</h1>
      <Text className="font-bold">oi</Text>
      <Button
        title="Pokedex"
        onPress={rotear}
        style={{ marginTop: 25, borderRadius: 25, width: "50%" }}
      />
    </View>
  );
}