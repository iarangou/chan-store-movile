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

export default function StoreAddProduct() {
  const [showCart, setShowCart] = useState(false);

  // Campos vacíos para crear nuevo producto
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  return (
    <View style={styles.container}>

      {/* Menú derecho carrito */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* ---------------- HEADER ---------------- */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />
        <Text style={styles.headerTitle}>Añadir producto</Text>
        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ---------------- CONTENIDO ---------------- */}
      <ScrollView contentContainerStyle={styles.content}>

        {/* Imagen (placeholder) */}
        <View style={styles.imagePlaceholder} />

        {/* Nombre */}
        <Text style={styles.label}>Nombre del producto</Text>
        <TextInput
          style={styles.input}
          value={productName}
          onChangeText={setProductName}
          placeholder="Escribe el nombre"
          placeholderTextColor="#777"
        />

        {/* Descripción */}
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.textArea}
          multiline
          value={description}
          onChangeText={setDescription}
          placeholder="Escribe la descripción"
          placeholderTextColor="#777"
        />

        {/* Etiquetas */}
        <Text style={styles.label}>Etiquetas</Text>
        <TextInput
          style={styles.input}
          value={tags}
          onChangeText={setTags}
          placeholder="Ej: ropa, oferta, verano"
          placeholderTextColor="#777"
        />

        {/* Precio */}
        <Text style={styles.label}>Precio</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
          placeholder="Precio"
          placeholderTextColor="#777"
        />

        {/* Stock */}
        <Text style={styles.label}>Unidades disponibles</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={stock}
          onChangeText={setStock}
          placeholder="Cantidad"
          placeholderTextColor="#777"
        />

        {/* Botón AGREGAR */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agregar</Text>
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
