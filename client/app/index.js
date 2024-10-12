import { Link } from "expo-router";
import { View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  return (
    <LinearGradient
      colors={["#FFFFFF", "#7DF9FF"]}
      start={[0.5, 0]}
      end={[0.5, 1]}
      locations={[0.268, 1]}
      style={styles.container}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/images/Logo1.png")}
          style={styles.logo}
        />
        <View style={styles.buttonContainer}>
          <Link href="./(auth)/login" style={styles.button}>
            <Ionicons
              name="arrow-forward-outline"
              size={30}
              color="#7DF9FF"
              style={styles.icon}
            />
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
  },
  logo: {
    width: 240,
    height: 220,
    marginBottom: 30,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 80,
    margin: 10,
    width: 65,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
  },
  icon: {},
});
