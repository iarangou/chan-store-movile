import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RightCartMenu from "../../components/RightCartMenu";

export default function PaymentMethods() {
  const [showCart, setShowCart] = useState(false);

  return (
    <View style={styles.container}>

      {/* Menú deslizable derecho */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* -------- HEADER -------- */}
      <View style={styles.header}>

        {/* Menú izquierdo */}
        <DrawerToggleButton tintColor="#fff" />

        {/* Logo carrito */}
        <Ionicons name="card-outline" size={32} color="#fff" />

        {/* Título */}
        <Text style={styles.headerTitle}>Métodos de pago</Text>

        {/* Carrito */}
        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ---------- CONTENIDO ---------- */}
      <ScrollView contentContainerStyle={styles.content}>

        {/* Tarjeta guardada */}
        <View style={styles.card}>
          <Text style={styles.cardNumber}>XXXXX XXXX1234</Text>
          <Text style={styles.cardHolder}>nombre titular</Text>

          {/* Estrella */}
          <Ionicons 
            name="star" 
            size={32} 
            color="#fff"
            style={styles.star}
          />
        </View>

        {/* Botón para nueva tarjeta */}
        <TouchableOpacity style={styles.addCardButton}>
          <Ionicons name="add" size={70} color="#fff" />
        </TouchableOpacity>

      </ScrollView>

    </View>
  );
}

/* ------------- ESTILOS ------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  /* HEADER */
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

  /* CONTENIDO */
  content: {
    padding: 16,
  },

  card: {
    backgroundColor: "#6CA9FF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    height: 150,
  },

  cardNumber: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  cardHolder: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 12,
  },

  star: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },

  addCardButton: {
    backgroundColor: "#6CA9FF",
    borderRadius: 12,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});
