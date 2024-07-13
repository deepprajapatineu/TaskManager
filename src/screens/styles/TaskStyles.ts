import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cccccc",
    alignItems: "center",
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  iconsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  insideIconsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  iconEdit: {
    alignSelf: "flex-start",
  },
  iconDelete: {
    alignSelf: "flex-end",
  },
  statusCompleted: {
    fontWeight: "bold",
    color: "green",
  },
  statusPending: {
    fontWeight: "bold",
    color: "red",
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default styles;
