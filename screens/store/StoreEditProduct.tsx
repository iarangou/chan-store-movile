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

export default function StoreEditProduct() {
  const [showCart, setShowCart] = useState(false);

  // Simulación: datos que vienen del backend
  const [productName, setProductName] = useState("Nombre producto");
  const [description, setDescription] = useState(
    "Descripción actual de este artículo. Aquí se explica brevemente qué incluye y sus características principales."
  );
  const [tags, setTags] = useState("etiqueta1, etiqueta2");
  const [price, setPrice] = useState("25000");
  const [stock, setStock] = useState("10");

  return (
    <View style={styles.container}>

      {/* Menú derecho carrito */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* ---------------- HEADER ---------------- */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />

        <Text style={styles.headerTitle}>Editar producto</Text>

        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ---------------- CONTENIDO ---------------- */}
      <ScrollView contentContainerStyle={styles.content}>

        {/* Imagen del producto */}
        <View style={styles.imagePlaceholder} />

        {/* Nombre del producto */}
        <Text style={styles.productName}>{productName}</Text>

        {/* DESCRIPCIÓN */}
        <Text style={styles.label}>Descripción Actual</Text>
        <TextInput
          style={styles.textArea}
          multiline
          value={description}
          onChangeText={setDescription}
          placeholder="Descripción"
          placeholderTextColor="#777"
        />

        {/* ETIQUETAS */}
        <Text style={styles.label}>Etiquetas actuales</Text>
        <TextInput
          style={styles.input}
          value={tags}
          onChangeText={setTags}
          placeholder="Ej: ropa, oferta, verano"
          placeholderTextColor="#777"
        />

        {/* PRECIO */}
        <Text style={styles.label}>Precio</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
          placeholder="Precio"
          placeholderTextColor="#777"
        />

        {/* STOCK */}
        <Text style={styles.label}>Unidades disponibles</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={stock}
          onChangeText={setStock}
          placeholder="Cantidad"
          placeholderTextColor="#777"
        />

        {/* BOTÓN ACTUALIZAR */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Actualizar</Text>
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
    paddingBottom: 80,
  },

  imagePlaceholder: {
    width: "100%",
    height: 220,
    backgroundColor: "#D9E6F6",
    borderRadius: 12,
    marginBottom: 20,
  },

  productName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#D9E6F6",
    padding: 10,
    borderRadius: 10,
    fontSize: 14,
    marginBottom: 10,
    color: "#000",
  },

  textArea: {
    backgroundColor: "#D9E6F6",
    padding: 10,
    borderRadius: 10,
    minHeight: 100,
    textAlignVertical: "top",
    fontSize: 14,
    color: "#000",
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
