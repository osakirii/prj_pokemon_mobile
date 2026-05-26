import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { View } from "react-native";

// layout principal da aplicação
// TODO terminar de estilizar
export default function Root() {
  return (
    <AuthProvider>
      <div
        style={{
          backgroundColor: "#000000",
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            backgroundColor: "#d73431",
            margin: 50,
            padding: 35,
            borderRadius: 50,
            borderRightWidth: 8,
            borderBottomWidth: 8,
            borderColor: "#a50e15",
          }}
        >
          <div
            style={{
              borderRadius: 15,
              backgroundColor: "#071018",

              backgroundImage: `
      repeating-linear-gradient(
        to bottom,
        rgba(255,255,255,0.03) 0px,
        rgba(255,255,255,0.03) 1px,
        transparent 2px,
        transparent 4px
      )
    `,

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Slot />
          </div>
        </View>
      </div>
    </AuthProvider>
  );
}
