import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  keyboardView: {
    marginHorizontal: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 24,
    color: "#333",
    textAlign: "center",
  },
  input: {
    height: 50,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    fontSize: 16,
    flex: 1,
    marginBottom: 12,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  iconButton: {
    position: "absolute",
    right: 10,
    top: -10,
    bottom: 0,
    justifyContent: "center",
    padding: 10,
  },
  button: {
    backgroundColor: "#0052cc",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
  },
  buttonSecondary: {
    marginTop: 12,
    borderColor: "#0052cc",
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextSecondary: {
    color: "#0052cc",
    fontSize: 18,
    fontWeight: "500",
  },
  errorText: {
    color: "#ff3333",
    marginTop: 10,
    textAlign: "center",
  },
});

export default styles;
