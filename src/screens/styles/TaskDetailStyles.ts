import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 3,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    width: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
  },
  descriptionScroll: {
    maxHeight: 100,
    marginLeft: 10,
  },
  info: {
    fontSize: 16,
    marginLeft: 10,
  },
  separator: {
    height: "100%",
    width: 1,
    backgroundColor: "#ddd",
    marginHorizontal: 10,
  },
  statusCompleted: {
    color: "green",
  },
  statusPending: {
    color: "red",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
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
