import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import RightCartMenu from "../../../components/RightCartMenu";

export default function MyStore() {
  const [showCart, setShowCart] = useState(false);

  return (
    <View style={styles.container}>

      {/* MENÚ DESLIZABLE DERECHO */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* ---------------- HEADER ---------------- */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />

        <Text style={styles.headerTitle}>Mi Tienda</Text>

        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ---------------- CONTENIDO ---------------- */}
      <ScrollView contentContainerStyle={styles.content}>

        {/* Fondo azul + curva blanca */}
        <View style={styles.curvedArea}>
          <View style={styles.whiteCurve} />

          <Image
            source={require("../../assets/images/react-logo.png")} // Usa tu imagen real
            style={styles.storeImage}
          />
        </View>

        {/* Nombre tienda */}
        <Text style={styles.storeName}>Nombre tienda</Text>

        {/* Sección de estadísticas */}
        <Text style={styles.statsTitle}>Estadísticas-------------------------------</Text>

        {/* BOTONES */}
        <View style={styles.buttonsContainer}>
          <Button label="Editar datos" />
          <Button label="Mis productos" />
          <Button label="Gestionar ordenes" />
        </View>

      </ScrollView>
    </View>
  );
}

function Button({ label }: { label: string }) {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

/* ---------------- ESTILOS ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7EB6FF",
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
  },

  curvedArea: {
    backgroundColor: "#7EB6FF",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 60,
  },

  whiteCurve: {
    position: "absolute",
    top: 120,
    width: "130%",
    height: 150,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },

  storeImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#fff",
  },

  storeName: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: -10,
  },

  statsTitle: {
    marginTop: 20,
    fontSize: 15,
    paddingLeft: 20,
    fontWeight: "600",
    color: "#000",
  },

  buttonsContainer: {
    marginTop: 30,
    alignItems: "center",
    gap: 20,
  },

  button: {
    backgroundColor: "#4C8DFF",
    width: "70%",
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
