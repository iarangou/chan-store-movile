import { router } from "expo-router";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RecoverPassword() {
  return (
    <View style={styles.container}>

      {/* Botón X */}
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      {/* Imagen carrito */}
      <Image
        source={require("../assets/images/cart.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Caja blanca */}
      <View style={styles.box}>

        <Text style={styles.label}>Correo</Text>

        <TextInput
          placeholder="Correo"
          placeholderTextColor="#BDBDBD"
          style={styles.input}
        />

        {/* Botón azul */}
        <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/recover-success")}
        >
            <Text style={styles.primaryButtonText}>Enviar correo</Text>
        </TouchableOpacity>


        {/* link registrate */}
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.registerText}>Registrate</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 40,
    paddingHorizontal: 24,
  },

  closeButton: {
    alignSelf: "flex-end",
  },
  closeText: {
    fontSize: 26,
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
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignSelf: "center",
    width: "85%",
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },

  primaryButton: {
    backgroundColor: "#2F80ED",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  primaryButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },

  registerText: {
    textAlign: "center",
    marginTop: 12,
    color: "#333",
    fontSize: 15,
  },
});
