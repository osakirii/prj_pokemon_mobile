import { Colors } from "@/constants/colors";
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
          backgroundColor: Colors.background,
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            backgroundColor: Colors.primaryColor,
            margin: 50,
            padding: 35,
            borderRadius: 50,
            borderRightWidth: 8,
            borderBottomWidth: 8,
            borderColor: Colors.secondaryColor,
          }}
        >
          {/* Circulos */}
          <div
            style={{
              width: 300,
              height: 80,
              background: Colors.primaryColor,
              display: 'flex',
              alignItems: 'center',

              padding: "0 20px",
              gap: 20,
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: Colors.tertiaryColor,
                border: "5px solid #d9ecff",
                boxShadow: "0 0 20px rgba(100, 200, 255, 0.8)",
              }}
            />

            {/* bolinhas */}
            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "#d62828",
                  boxShadow: "0 0 8px rgba(0,0,0,0.4)",
                }}
              />

              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "#ffd60a",
                  boxShadow: "0 0 8px rgba(0,0,0,0.4)",
                }}
              />

              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "#34c759",
                  boxShadow: "0 0 8px rgba(0,0,0,0.4)",
                }}
              />
            </div>
          </div>
          <div
            style={{
              paddingLeft: "5rem",
              paddingRight: "5rem",
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
