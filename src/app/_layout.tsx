import { AuthProvider } from "@/context/AuthContext";   
import { Slot } from "expo-router";
import { View } from "react-native";

export default function Root() {
    return (
        <AuthProvider>
            <View style={{ backgroundColor: '#d73431', margin: 50, padding: 35, borderRadius: 50, borderRightWidth: 8, borderBottomWidth: 8, borderColor: '#a50e15'}}>
                <Slot />
            </View>
        </AuthProvider>
    );
}