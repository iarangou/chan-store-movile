import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import RightCartMenu from "../../../components/RightCartMenu";

export default function EmailChanged() {
  const [showCart, setShowCart] = useState(false);

  return (
    <View style={styles.container}>

      {/* Menú derecho */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* ---------------- HEADER ---------------- */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />
        <Ionicons name="mail-outline" size={32} color="#fff" />
        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ---------------- CONTENIDO ---------------- */}
      <View style={styles.centerBox}>

        <View style={styles.card}>
          <Text style={styles.message}>
            Su cambio de correo ha sido exitoso
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
        </View>

      </View>

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

  /* Centrado */
  centerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  /* Tarjeta blanca */
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },

  button: {
    backgroundColor: "#4C8DFF",
    paddingVertical: 12,
    borderRadius: 8,
  },

  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
