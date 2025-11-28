import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RegisterSuccess() {
  return (
    <View style={styles.container}>

      {/* Botón X */}
      <TouchableOpacity style={styles.closeButton} onPress={() => router.replace("/login")}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      {/* Imagen */}
      <Image
        source={require("../assets/image/cart.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Caja con mensaje */}
      <View style={styles.box}>
        <Text style={styles.successText}>Registro exitoso</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 40,
    justifyContent: "flex-start",
  },

  closeButton: {
    alignSelf: "flex-end",
  },

  closeText: {
    fontSize: 28,
    color: "#333",
  },

  image: {
    width: 160,
    height: 130,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
  },

  box: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingVertical: 22,
    paddingHorizontal: 20,
    alignSelf: "center",
    width: "85%",
  },

  successText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },

  button: {
    backgroundColor: "#2F80ED",
    paddingVertical: 14,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
});
