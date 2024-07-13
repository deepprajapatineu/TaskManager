import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  input: {
    height: 50,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#0052cc",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  buttonSave: {
    backgroundColor: "green",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonCancel: {
    borderColor: "#cc0000",
    borderWidth: 1,
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonTextCancel: {
    color: "#cc0000",
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 18,
    color: "#666",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fullSizeImage: {
    width: 300,
    height: 400,
    resizeMode: "contain",
  },
});

export default styles;
