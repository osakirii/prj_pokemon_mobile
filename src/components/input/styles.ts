import { StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

export const styles = StyleSheet.create({
  input: {
    width: 500,
    height: 50,

    backgroundColor: "#000000",
    opacity: 1,

    borderColor: "#1f3d50",
    borderWidth: 1,
    borderRadius: 12,

    color: Colors.tertiaryColor,
    display: "flex",
    alignItems: "center",
    paddingLeft: 20,
    fontFamily: "monospace",
    fontSize: 18,
  },
});
