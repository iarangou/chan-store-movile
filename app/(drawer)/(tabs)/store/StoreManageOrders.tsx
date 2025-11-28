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

export default function StoreManageOrders() {
  const [showCart, setShowCart] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("pendiente");

  // Datos simulados
  const orders = [
    {
      id: "12456",
      products: 3,
      address: "Cra 5 # 10-22",
      date: "28/01/2025",
      status: "pendiente",
    },
    {
      id: "12457",
      products: 2,
      address: "Calle 9 # 39-20",
      date: "25/01/2025",
      status: "procesado",
    },
    {
      id: "12458",
      products: 5,
      address: "Av 3N # 12-50",
      date: "21/01/2025",
      status: "enviado",
    },
  ];

  const filtered = orders.filter((o) => o.status === selectedFilter);

  return (
    <View style={styles.container}>

      {/* Menú derecho carrito */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* ---------------- HEADER ---------------- */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />
        <Text style={styles.headerTitle}>Gestionar órdenes</Text>
        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ---------------- FILTROS ---------------- */}
      <View style={styles.filtersContainer}>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "pendiente" && styles.filterActive,
          ]}
          onPress={() => setSelectedFilter("pendiente")}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === "pendiente" && styles.filterTextActive,
            ]}
          >
            pendiente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "procesado" && styles.filterActive,
          ]}
          onPress={() => setSelectedFilter("procesado")}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === "procesado" && styles.filterTextActive,
            ]}
          >
            Procesado
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "enviado" && styles.filterActive,
          ]}
          onPress={() => setSelectedFilter("enviado")}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === "enviado" && styles.filterTextActive,
            ]}
          >
            enviado
          </Text>
        </TouchableOpacity>
      </View>

      {/* ---------------- LISTA ---------------- */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {filtered.map((order) => (
          <View key={order.id} style={styles.orderBox}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderText}>Pedido #{order.id}</Text>
              <Text style={styles.orderText}>
                {order.products} productos
              </Text>
              <Text style={styles.orderText}>{order.address}</Text>
              <Text style={styles.orderText}>{order.date}</Text>
            </View>

            <TouchableOpacity style={styles.arrowBox}>
              <Ionicons name="chevron-forward" size={28} color="#fff" />
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

  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#fff",
  },

  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#E6EEFA",
  },

  filterActive: {
    backgroundColor: "#4C8DFF",
  },

  filterText: {
    color: "#4C8DFF",
    fontWeight: "600",
  },

  filterTextActive: {
    color: "#fff",
  },

  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  orderBox: {
    flexDirection: "row",
    backgroundColor: "#D9E6F6",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
  },

  orderInfo: {
    flex: 1,
  },

  orderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  arrowBox: {
    backgroundColor: "#4C8DFF",
    padding: 8,
    borderRadius: 8,
  },
});
