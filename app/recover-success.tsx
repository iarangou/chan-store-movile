import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RecoverSuccess() {
  return (
    <View style={styles.container}>

      {/* Botón X */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      {/* Imagen superior */}
      <Image
        source={require("../assets/image/cart.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Caja blanca */}
      <View style={styles.box}>
        <Text style={styles.message}>
          Se ha enviado un correo para{'\n'}recuperar su contraseña.
        </Text>

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
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 24,
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
    height: 120,
    alignSelf: "center",
    marginTop: 10,
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

  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
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
