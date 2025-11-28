import { router } from "expo-router";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Register() {
  return (
    <View style={styles.screenContainer}>

      {/* Botón cerrar (X) */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      {/* Caja blanca */}
      <View style={styles.formBox}>
        
        <Text style={styles.label}>Nombre de usuario</Text>
        <TextInput
          placeholder="nombre de usuario"
          placeholderTextColor="#BDBDBD"
          style={styles.input}
        />

        <Text style={styles.label}>Correo</Text>
        <TextInput
          placeholder="Correo"
          placeholderTextColor="#BDBDBD"
          style={styles.input}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#BDBDBD"
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.label}>Confirmar contraseña</Text>
        <TextInput
          placeholder="Confirmar contraseña"
          placeholderTextColor="#BDBDBD"
          secureTextEntry
          style={styles.input}
        />

        {/* Botón registrarse */}
        <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/register-success")}
        >
            <Text style={styles.primaryButtonText}>Registrarse</Text>
        </TouchableOpacity>

      </View>

      {/* Imagen inferior */}
      <Image
        source={require("../assets/images/cart.png")} // usa tu imagen
        style={styles.footerImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 40,
    justifyContent: "space-between",
  },

  closeButton: {
    alignSelf: "flex-end",
  },
  closeText: {
    fontSize: 26,
    color: "#333",
  },

  formBox: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 20,
  },

  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
    marginTop: 8,
    fontWeight: "500",
  },

  input: {
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 6,
  },

  primaryButton: {
    backgroundColor: "#2F80ED",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 16,
  },
  primaryButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },

  footerImage: {
    width: 130,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
});
