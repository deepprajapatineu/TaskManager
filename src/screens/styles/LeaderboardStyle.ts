import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f4f4f4",
  },
  segmentedControl: {
    marginBottom: 20,
    height: 40,
  },
  scrollView: {
    marginVertical: 10,
  },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    elevation: 3,
  },
  userName: {
    fontSize: 16,
    color: "#333",
  },
  taskCountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskCount: {
    fontSize: 16,
    color: "#333",
    marginRight: 5,
  },
  iconStyle: {
    color: "#4CAF50",
  },
});

export default styles;
