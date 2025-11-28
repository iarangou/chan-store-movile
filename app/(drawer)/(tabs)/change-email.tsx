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

export default function ChangeEmail() {
  const [showCart, setShowCart] = useState(false);

  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");

  return (
    <View style={styles.container}>
      
      {/* Carrito */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* ---------------- HEADER ---------------- */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />

        <Text style={styles.headerTitle}>Cambio Correo</Text>

        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ---------------- CONTENIDO ---------------- */}
      <ScrollView contentContainerStyle={styles.content}>

        {/* Título */}
        <Text style={styles.title}>Cambio Correo</Text>

        {/* Nuevo correo */}
        <Text style={styles.label}>Nuevo Correo</Text>
        <TextInput
          placeholder="Escriba aqui su nuevo correo"
          placeholderTextColor="#777"
          style={styles.input}
          keyboardType="email-address"
          value={email1}
          onChangeText={setEmail1}
        />

        {/* Confirmar correo */}
        <Text style={styles.label}>Confirme Correo</Text>
        <TextInput
          placeholder="Escriba aqui su nuevo correo"
          placeholderTextColor="#777"
          style={styles.input}
          keyboardType="email-address"
          value={email2}
          onChangeText={setEmail2}
        />

        {/* Botón Actualizar */}
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Actualizar</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

/* ---------------- ESTILOS ---------------- */

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
    marginBottom: 20,
  },

  updateButton: {
    backgroundColor: "#4C8DFF",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
  },

  updateButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
