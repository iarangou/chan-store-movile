import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RightCartMenu from "../../../../components/RightCartMenu";

export default function StoreOrderDetail() {
  const [showCart, setShowCart] = useState(false);

  // Ejemplo de datos (esto luego vendrá del backend)
  const order = {
    id: "12345",
    address: "Cra 5 # 22-41",
    date: "28/01/2025",
    products: [
      { id: 1, name: "Producto A", qty: 2 },
      { id: 2, name: "Producto B", qty: 1 },
      { id: 3, name: "Producto C", qty: 3 },
      { id: 4, name: "Producto D", qty: 1 },
    ],
  };

  return (
    <View style={styles.container}>

      {/* PANEL DERECHO DEL CARRITO */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* ------------- HEADER ------------- */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />
        <Text style={styles.headerTitle}>Orden #{order.id}</Text>
        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ------------- CONTENIDO ------------- */}
      <ScrollView contentContainerStyle={styles.content}>

        {/* INFO GENERAL */}
        <Text style={styles.label}>Número de orden</Text>
        <Text style={styles.value}>{order.id}</Text>

        <Text style={styles.label}>Dirección envío</Text>
        <Text style={styles.value}>{order.address}</Text>

        <Text style={styles.label}>Fecha pedido</Text>
        <Text style={styles.value}>{order.date}</Text>

        {/* LISTA DE PRODUCTOS */}
        <View style={styles.productsContainer}>
          {order.products.map((p) => (
            <View key={p.id} style={styles.productBox}>
              <Text style={styles.productName}>{p.name}</Text>
              <Text style={styles.productQty}>Cantidad: {p.qty}</Text>
            </View>
          ))}
        </View>

        {/* BOTÓN CAMBIAR ETAPA */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cambiar Etapa</Text>
        </TouchableOpacity>

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

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
    marginBottom: 2,
  },

  value: {
    fontSize: 15,
    color: "#333",
    marginBottom: 12,
  },

  productsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },

  productBox: {
    backgroundColor: "#D9E6F6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  productName: {
    fontSize: 15,
    fontWeight: "700",
  },

  productQty: {
    marginTop: 4,
    fontSize: 14,
    color: "#333",
  },

  button: {
    backgroundColor: "#4C8DFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
