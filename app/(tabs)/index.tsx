import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RightCartMenu from "../../components/RightCartMenu";

export default function Home() {
  const [showCart, setShowCart] = useState(false);

  return (
    <View style={styles.container}>
      {/* ----- MENU CARRITO DESLIZABLE ----- */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* ----- ENCABEZADO SUPERIOR ----- */}
      <View style={styles.header}>
        
        {/* Botón menú IZQUIERDO */}
        <TouchableOpacity style={styles.menuButton}>
          <DrawerToggleButton tintColor="#fff" />
        </TouchableOpacity>

        {/* Logo carrito del header */}
        <Image
          source={require("../../assets/images/cart.png")}
          style={styles.headerIcon}
        />

        {/* Barra de búsqueda */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#555" style={{ marginRight: 6 }} />
          <TextInput 
            placeholder="Search"
            placeholderTextColor="#777"
            style={styles.searchInput}
          />
        </View>

        {/* Botón carrito DERECHO */}
        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ----- CONTENIDO SCROLLEABLE ----- */}
      <ScrollView style={styles.scroll}>

        {/* --- SECCIÓN TOP SALE --- */}
        <Section title="TOP SALE" />

        {/* Carrusel 1 */}
        <Carousel />

        {/* --- SECCIÓN SUGERIDOS --- */}
        <Section title="Sugeridos" />

        <Carousel />

        {/* --- SECCIÓN CATEGORÍA --- */}
        <Section title="Categoria" />

        <Carousel />

      </ScrollView>
    </View>
  );
}

/* ------------------------------ */
/* COMPONENTE SECCIÓN (TÍTULO)    */
/* ------------------------------ */
function Section({ title }: any) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.line} />
    </View>
  );
}

/* ------------------------------ */
/* COMPONENTE CARRUSEL DE PRODUCTOS */
/* ------------------------------ */
function Carousel() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginBottom: 20 }}
    >
      {[1,2,3,4].map((item) => (
        <View key={item} style={styles.productCard}>
          <View style={styles.productImage} />
          <Text style={styles.productLabel}>producto</Text>
          <Text style={styles.price}>$$$</Text>
        </View>
      ))}
    </ScrollView>
  );
}

/* ------------------------------ */
/* ESTILOS                        */
/* ------------------------------ */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  /* HEADER */
  header: {
    backgroundColor: "#0F2A50",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 45,
    paddingBottom: 12,
    justifyContent: "space-between",
  },
  menuButton: { width: 35 },
  headerIcon: { width: 38, height: 38, tintColor: "#fff" },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 34,
    flex: 1,
    marginHorizontal: 10,
  },
  searchInput: { flex: 1, fontSize: 14, color: "#333" },

  scroll: { paddingHorizontal: 12 },

  /* SECTIONS */
  section: { marginTop: 20, marginBottom: 10 },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  line: {
    height: 1,
    backgroundColor: "#000",
    marginTop: 4,
    width: "40%",
  },

  /* PRODUCTOS */
  productCard: {
    width: 130,
    marginRight: 12,
  },
  productImage: {
    width: "100%",
    height: 110,
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
  },
  productLabel: { fontWeight: "600", marginTop: 6, color: "#333" },
  price: { fontWeight: "700", color: "#000" },
});
