import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import RightCartMenu from "../../../components/RightCartMenu";

export default function ChangePassword() {
  const [showCart, setShowCart] = useState(false);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  return (
    <View style={styles.container}>

      {/* Carrito derecho */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* -------------- HEADER -------------- */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />

        <Text style={styles.headerTitle}>Cambio Contraseña</Text>

        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* -------------- CONTENIDO -------------- */}
      <ScrollView contentContainerStyle={styles.content}>

        {/* TÍTULO GRANDE */}
        <Text style={styles.title}>
          Cambio{"\n"}Contraseña
        </Text>

        {/* CONTRASEÑA ACTUAL */}
        <Text style={styles.label}>Contraseña Actual</Text>

        <TextInput
          placeholder="Escriba aqui su contraseña"
          placeholderTextColor="#777"
          secureTextEntry
          style={styles.input}
          value={oldPass}
          onChangeText={setOldPass}
        />

        <TouchableOpacity>
          <Text style={styles.forgotLink}>¿Olvido contraseña?</Text>
        </TouchableOpacity>

        {/* NUEVA CONTRASEÑA */}
        <Text style={styles.label}>Nueva Contraseña</Text>

        <TextInput
          placeholder="Escriba aqui su nueva contraseña"
          placeholderTextColor="#777"
          secureTextEntry
          style={styles.input}
          value={newPass}
          onChangeText={setNewPass}
        />

        {/* CONFIRMAR CONTRASEÑA */}
        <Text style={styles.label}>Confirme Contraseña</Text>

        <TextInput
          placeholder="Escriba aqui su nueva contraseña"
          placeholderTextColor="#777"
          secureTextEntry
          style={styles.input}
          value={confirmPass}
          onChangeText={setConfirmPass}
        />

        {/* BOTÓN */}
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Actualizar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* ----------------- ESTILOS ----------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    backgroundColor: "#0F2A50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 45,
    paddingBottom: 12,
    paddingHorizontal: 14,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#4C8DFF",
    marginBottom: 26,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
    marginTop: 10,
    color: "#000",
  },

  input: {
    backgroundColor: "#DDE7F9",
    borderRadius: 8,
    padding: 12,
    color: "#333",
  },

  forgotLink: {
    color: "#4C8DFF",
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
    textDecorationLine: "underline",
  },

  updateButton: {
    backgroundColor: "#4C8DFF",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 40,
  },

  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
