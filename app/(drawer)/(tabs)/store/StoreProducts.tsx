import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import RightCartMenu from "../../../../components/RightCartMenu";

export default function StoreProducts() {
  const [showCart, setShowCart] = useState(false);

  // --- este listado luego vendrá del backend ----
  const products = [
    {
      id: 1,
      name: "Nombre articulo",
      description: "Descripcion",
      price: "$20.000",
      stock: "10 unidades",
    },
    {
      id: 2,
      name: "Nombre articulo",
      description: "Descripcion",
      price: "$15.000",
      stock: "5 unidades",
    },
    {
      id: 3,
      name: "Nombre articulo",
      description: "Descripcion",
      price: "$30.000",
      stock: "20 unidades",
    },
  ];

  return (
    <View style={styles.container}>
      {/* --- Panel derecho carrito --- */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* ---------------- HEADER ---------------- */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />

        <Text style={styles.headerTitle}>Mis artículos</Text>

        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ---------------- LISTA ---------------- */}
      <ScrollView contentContainerStyle={styles.content}>

        {/* BOTÓN AÑADIR */}
        <TouchableOpacity style={styles.addItem}>
          <View style={styles.addBox}>
            <Text style={styles.plus}>+</Text>
          </View>

          <Text style={styles.addText}>Añadir artículo</Text>
        </TouchableOpacity>

        {/* LISTADO DE PRODUCTOS */}
        {products.map((item) => (
          <View key={item.id} style={styles.productBox}>
            <View style={styles.imagePlaceholder} />

            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDesc}>{item.description}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <Text style={styles.productStock}>{item.stock}</Text>
            </View>
          </View>
        ))}

      </ScrollView>
    </View>
  );
}

/* ---------------- ESTILOS ---------------- */

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
    padding: 20,
    paddingBottom: 50,
  },

  /* --- Añadir artículo --- */
  addItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  addBox: {
    width: 80,
    height: 80,
    backgroundColor: "#D9E6F6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  plus: {
    fontSize: 50,
    color: "#4C8DFF",
    marginTop: -5,
  },

  addText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  /* --- Producto --- */
  productBox: {
    flexDirection: "row",
    paddingVertical: 15,
  },

  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: "#D9E6F6",
    borderRadius: 10,
  },

  productInfo: {
    marginLeft: 15,
    justifyContent: "center",
  },

  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },

  productDesc: {
    marginTop: 2,
    fontSize: 14,
    color: "#444",
  },

  productPrice: {
    marginTop: 2,
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },

  productStock: {
    marginTop: 2,
    fontSize: 12,
    color: "#333",
  },
});
