import RightCartMenu from "@/components/RightCartMenu";
import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { router } from "expo-router";
import React, { useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function Favorites() {
  const [showCart, setShowCart] = useState(false);

  // Ejemplo de favoritos (luego vendrá del backend)
  const favorites = [
    { id: 1, name: "Nombre artículo", desc: "Descripción", price: "$50.000" },
    { id: 2, name: "Nombre artículo", desc: "Descripción", price: "$80.000" },
    { id: 3, name: "Nombre artículo", desc: "Descripción", price: "$20.000" },
    { id: 4, name: "Nombre artículo", desc: "Descripción", price: "$40.000" },
  ];

  return (
    <View style={styles.container}>

      {/* MENÚ DERECHO */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* HEADER */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />
        <Text style={styles.headerTitle}>Favoritos</Text>

        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* LISTA DE FAVORITOS */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {favorites.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => router.push(`/(drawer)/product/${item.id}`)}
          >
        <View style={styles.imagePlaceholder} />
        <View style={styles.infoBox}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.desc}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    ))}
      </ScrollView>

    </View>
  );
}

/* ------------------- ESTILOS -------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

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
    fontSize: 20,
    fontWeight: "700",
  },

  content: {
    paddingHorizontal: 10,
    marginTop: 10,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#F0F4FA",
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
  },

  imagePlaceholder: {
    width: 90,
    height: 90,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
  },

  infoBox: {
    marginLeft: 12,
    flex: 1,
    justifyContent: "center",
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
  },

  description: {
    fontSize: 13,
    color: "#444",
    marginVertical: 4,
  },

  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
});
