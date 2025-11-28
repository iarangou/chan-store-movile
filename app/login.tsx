import { router } from "expo-router";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.mainBox}>

        {/* Imagen */}
        <Image
          source={require("../assets/images/cart.png")} // pon tu imagen aquí
          style={styles.image}
          resizeMode="contain"
        />

        {/* Caja blanca con inputs */}
        <View style={styles.formBox}>
          
          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput
            placeholder="Nombre de usuario"
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

          {/* Botón iniciar sesión */}
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.replace("(tabs)")}>
            <Text style={styles.primaryButtonText}>Iniciar sesion</Text>
          </TouchableOpacity>

        </View>

        {/* Botón registrarse */}
        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/register")}>
          <Text style={styles.secondaryButtonText}>Registrarse</Text>
        </TouchableOpacity>

        {/* Olvido su contraseña */}
        <TouchableOpacity onPress={() => router.push("/recover-password")}>
          <Text style={styles.link}>¿Olvidó su contraseña?</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
  marginTop: 12,
  color: "#333",
  fontSize: 14,
  textAlign: "center",
},
  screenContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderWidth: 4,
    borderColor: "#2F80ED",
  },
  mainBox: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: 160,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: -40,
  },
  formBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 6,
    fontWeight: "500",
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
    borderRadius: 8,
    marginTop: 10,
  },
  primaryButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#2F80ED",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  forgotText: {
    textAlign: "center",
    color: "#333",
    marginTop: 8,
  },
});
