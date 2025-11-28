import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RightCartMenu from "../../../components/RightCartMenu";


export default function ProductPage() {
  const { id } = useLocalSearchParams();

  const [showCart, setShowCart] = useState(false);
  const [count, setCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);


  return (
    <View style={styles.container}>

      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* HEADER */}
      <View style={styles.header}>
        
        {/* Menú izquierdo */}
        <DrawerToggleButton tintColor="#fff" />

        {/* Icono carrito arriba */}
        <Image
          source={require("../../../assets/images/cart.png")}
          style={styles.headerIcon}
        />

        {/* Barra de búsqueda */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#555" style={{ marginRight: 6 }} />
          <Text style={{ color: "#888", fontSize: 14 }}>Search</Text>
        </View>

        {/* Carrito derecho */}
        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>

        {/* IMAGEN PRINCIPAL */}
        <View style={styles.mainImage} />

        {/* NOMBRE + CONTADOR + PRECIO */}
        <View style={styles.row}>
          <View>
            <Text style={styles.productTitle}>Nombre producto</Text>
          </View>

          <View style={styles.counter}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setCount(Math.max(0, count - 1))}
            >
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.counterValue}>{count}</Text>

            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setCount(count + 1)}
            >
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.priceLabel}>Precio</Text>
          </View>
        </View>

        {/* CORAZÓN FAVORITO */}
        <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
        >
            {isFavorite ? (
                <Ionicons name="heart" size={34} color="#000" />
            ) : (
                <Ionicons name="heart-outline" size={34} color="#000" />
            )}
        </TouchableOpacity>

        {/* DESCRIPCIÓN */}
        <Text style={styles.descriptionTitle}>Descripcion articulo</Text>

        <Text style={styles.descriptionText}>
          -------------------------------------{"\n"}
          -------------------------------------{"\n"}
          -------------------------------------
        </Text>

        {/* PERFIL VENDEDOR */}
        <Text style={styles.sellerTitle}>Perfil vendedor</Text>

        {/* Carrusel de sugerencias */}
        <Text style={styles.suggestionsTitle}>Sugerencias</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
        >
          {[1, 2, 3].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.suggestCard}
              onPress={() => router.push(`/(drawer)/product/${item}`)}
            >
              <View style={styles.suggestImage} />
              <Text style={styles.suggestLabel}>producto</Text>
              <Text style={styles.suggestPrice}>$$$</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </ScrollView>
    </View>
  );
}

/* ------------------------------ */
/* ESTILOS DE LA PÁGINA PRODUCTO  */
/* ------------------------------ */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  /* HEADER */
  header: {
    backgroundColor: "#0F2A50",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 45,
    paddingBottom: 12,
    justifyContent: "space-between",
  },
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

  /* CONTENIDO PRINCIPAL */
  content: { paddingHorizontal: 12 },

  mainImage: {
    width: "100%",
    height: 260,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    marginTop: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    justifyContent: "space-between",
  },

  productTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },

  /* CONTADOR */
  counter: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    backgroundColor: "#AECBFF",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: { fontSize: 20, color: "#0F2A50" },
  counterValue: { marginHorizontal: 8, fontSize: 18, fontWeight: "600" },

  priceLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },

  /* CORAZÓN */
  favoriteButton: {
    alignSelf: "flex-end",
    marginTop: -5,
    marginBottom: 15,
  },

  /* DESCRIPCIÓN */
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  descriptionText: {
    color: "#444",
    marginBottom: 14,
  },

  sellerTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 10,
  },

  suggestionsTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  /* SUGERENCIAS */
  suggestCard: {
    width: 130,
    marginRight: 12,
  },
  suggestImage: {
    width: "100%",
    height: 110,
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
  },
  suggestLabel: { fontWeight: "600", marginTop: 6, color: "#333" },
  suggestPrice: { fontWeight: "700", color: "#000" },
});
