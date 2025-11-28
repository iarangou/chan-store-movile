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

export default function StoreEditData() {
  const [showCart, setShowCart] = useState(false);

  const [name, setName] = useState("Chuzo");
  const [description, setDescription] = useState(
    "Tu tienda de confianza en Cali. Desde hace más de 15 años ofrecemos productos de primera necesidad. Atención cercana, precios justos y todo lo que necesitas a solo un clic de ti.\n\nVisitamos todos los días."
  );

  return (
    <View style={styles.container}>

      {/* PANEL DERECHO DEL CARRITO */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* ------------- HEADER ------------- */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />

        <Text style={styles.headerTitle}>Editar Datos</Text>

        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ------------- CONTENIDO ------------- */}
      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.pageTitle}>Editar datos</Text>

        {/* NOMBRE TIENDA */}
        <Text style={styles.label}>Nombre Actual</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nombre de tu tienda"
          placeholderTextColor="#999"
        />

        {/* DESCRIPCIÓN */}
        <Text style={styles.label}>Descripción Actual</Text>
        <TextInput
          style={styles.textArea}
          value={description}
          onChangeText={setDescription}
          placeholder="Descripción"
          placeholderTextColor="#999"
          multiline
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
    paddingBottom: 40,
    paddingHorizontal: 20,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#4C8DFF",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },

  label: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  input: {
    backgroundColor: "#D9E6F6",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    color: "#000",
  },

  textArea: {
    backgroundColor: "#D9E6F6",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    minHeight: 120,
    textAlignVertical: "top",
    color: "#000",
  },

  button: {
    backgroundColor: "#4C8DFF",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: "center",
    width: "70%",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
