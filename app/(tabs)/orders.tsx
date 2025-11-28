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
import RightCartMenu from "../../components/RightCartMenu";

export default function Orders() {
  const [showCart, setShowCart] = useState(false);

  const orders = [
    {
      id: 1,
      status: "En camino",
      date: "12/02/2025",
      products: [
        { name: "Nombre artículo", price: "50.000", qty: 1 },
        { name: "Nombre artículo", price: "30.000", qty: 2 },
      ],
    },
    {
      id: 2,
      status: "Entregado",
      date: "10/02/2025",
      products: [
        { name: "Nombre artículo", price: "20.000", qty: 1 },
        { name: "Nombre artículo", price: "38.000", qty: 1 },
      ],
    },
    {
      id: 3,
      status: "Pendiente",
      date: "08/02/2025",
      products: [
        { name: "Nombre artículo", price: "70.000", qty: 1 },
        { name: "Nombre artículo", price: "45.000", qty: 2 },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* --------------- HEADER ---------------- */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />

        {/* Barra de búsqueda */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#555" />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#777"
          />
        </View>

        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* TÍTULO */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Pedidos recientes</Text>
      </View>

      {/* ---------------- LISTA DE PEDIDOS ---------------- */}
      <ScrollView contentContainerStyle={styles.ordersList}>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>

            {/* ENCABEZADO DEL PEDIDO */}
            <View style={styles.orderHeader}>
              <Text style={styles.headerText}>Estado pedido</Text>
              <Text style={styles.headerText}>Fecha</Text>
            </View>

            {/* SUBTÍTULOS */}
            <View style={styles.orderHeader}>
              <Text style={styles.subHeaderText}>{order.status}</Text>
              <Text style={styles.subHeaderText}>{order.date}</Text>
            </View>

            {/* PRODUCTOS */}
            {order.products.map((p, index) => (
              <View key={index} style={styles.productRow}>
                <View style={styles.productImage} />

                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.productName}>{p.name}</Text>
                  <Text style={styles.productPrice}>
                    Precio / cantidad: ${p.price} / {p.qty}
                  </Text>
                </View>
              </View>
            ))}

            {/* BOTÓN MÁS DETALLES */}
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Mas detalles</Text>
            </TouchableOpacity>

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
    backgroundColor: "#E6EEF6",
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

  /* Search bar */
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

  /* TÍTULO */
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

  /* LISTA */
  ordersList: {
    padding: 12,
  },

  /* CARD DEL PEDIDO */
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  headerText: {
    fontWeight: "800",
    fontSize: 15,
  },

  subHeaderText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#4C8DFF",
  },

  productRow: {
    flexDirection: "row",
    marginBottom: 12,
  },

  productImage: {
    width: 60,
    height: 60,
    backgroundColor: "#D7DFEB",
    borderRadius: 8,
  },

  productName: {
    fontWeight: "700",
    fontSize: 15,
  },

  productPrice: {
    marginTop: 4,
    color: "#555",
    fontSize: 14,
  },

  detailsButton: {
    backgroundColor: "#4C8DFF",
    paddingVertical: 10,
    marginTop: 6,
    borderRadius: 6,
  },
  detailsButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
