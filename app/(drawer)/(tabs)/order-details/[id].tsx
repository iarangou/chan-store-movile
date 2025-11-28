import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import RightCartMenu from "../../../../components/RightCartMenu";

export default function OrderDetails() {
  const [showCart, setShowCart] = useState(false);
  const { id } = useLocalSearchParams(); // Obtiene el ID del pedido desde la URL

  const products = [
    { name: "Nombre producto", qty: 1, price: 50000 },
    { name: "Nombre producto", qty: 2, price: 30000 },
    { name: "Nombre producto", qty: 1, price: 45000 },
  ];

  return (
    <View style={styles.container}>
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* ------------------- HEADER ------------------- */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />

        {/* Search bar */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#555" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#777"
            style={styles.searchInput}
          />
        </View>

        {/* carrito */}
        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* TÍTULO */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Pedido #{id}</Text>
      </View>

      {/* ------------------- LISTA DE PRODUCTOS ------------------- */}
      <ScrollView style={{ flex: 1 }}>
        {products.map((p, index) => (
          <View key={index} style={styles.productCard}>
            <View style={styles.productImage} />

            <View style={{ marginLeft: 10 }}>
              <Text style={styles.productName}>{p.name}</Text>
              <Text style={styles.productQty}>Cantidad: {p.qty}</Text>
              <Text style={styles.productPrice}>Precio: ${p.price}</Text>
            </View>
          </View>
        ))}

        {/* ------------------- RESUMEN ------------------- */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            impuestos______________________________
          </Text>

          <Text style={styles.summaryText}>
            total___________________________________
          </Text>

          <Text style={styles.orderStatus}>ESTADO DEL PEDIDO</Text>
        </View>
      </ScrollView>
    </View>
  );
}

/* ------------------- ESTILOS ------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

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

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 8,
    width: "60%",
    height: 32,
  },

  searchInput: {
    marginLeft: 6,
    flex: 1,
  },

  titleContainer: {
    backgroundColor: "#0F2A50",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },

  productImage: {
    width: 90,
    height: 90,
    backgroundColor: "#D7DFEB",
    borderRadius: 8,
  },

  productName: {
    fontWeight: "700",
    fontSize: 16,
  },

  productQty: {
    marginTop: 4,
    color: "#555",
  },

  productPrice: {
    marginTop: 4,
    fontWeight: "700",
  },

  /* RESUMEN */
  summary: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 2,
    borderColor: "#ddd",
  },

  summaryText: {
    fontSize: 16,
    marginBottom: 10,
  },

  orderStatus: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 20,
    textAlign: "center",
  },
});
