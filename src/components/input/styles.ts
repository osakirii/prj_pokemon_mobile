import { StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

export const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,

    marginVertical: 10,

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

  inputFocused: {
    borderColor: Colors.primaryColor,
    borderWidth: 2,
  },
});
