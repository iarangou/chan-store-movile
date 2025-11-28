import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RightCartMenu from "../../../components/RightCartMenu";

export default function Profile() {
  const [showCart, setShowCart] = useState(false);

  return (
    <View style={styles.container}>

      {/* MENU DESLIZABLE */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* ENCABEZADO */}
      <View style={styles.header}>

        {/* Botón menú izquierdo */}
        <DrawerToggleButton tintColor="#fff" />

        {/* Icono logo carrito */}
        <Image
          source={require("../../../assets/images/cart.png")}
          style={styles.headerIcon}
        />

        {/* Título */}
        <Text style={styles.headerTitle}>Mi perfil</Text>

        {/* Carrito derecho */}
        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* CONTENIDO */}
      <ScrollView contentContainerStyle={styles.content}>

        {/* Fondo curvo */}
        <View style={styles.curvedBackground}>
          <View style={styles.whiteCurve} />

          {/* Foto usuario */}
          <Image
            source={{ uri: "https://i.pravatar.cc/200" }}
            style={styles.avatar}
          />
        </View>

        {/* Datos del usuario */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Nombre</Text>
          <Text style={styles.infoText}>Correo</Text>
          <Text style={styles.infoText}>Celular</Text>
          <Text style={styles.infoText}>Dirección</Text>
        </View>

        {/* BOTONES */}
        <View style={styles.buttonsContainer}>
          <Button label="Metodos de pago" />
          <Button label="Actualizar datos" />
          <Button label="Cambiar correo" />
          <Button label="Cambiar contraseña" />
        </View>

      </ScrollView>
    </View>
  );
}

/* COMPONENTE REUTILIZABLE PARA LOS BOTONES */
function Button({ label }: any) {
  return (
    <TouchableOpacity style={styles.actionButton}>
      <Text style={styles.actionButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

/* ESTILOS */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  /* HEADER */
  header: {
    backgroundColor: "#0F2A50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 45,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  headerIcon: {
    width: 35,
    height: 35,
    tintColor: "#fff",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  /* CONTENIDO */
  content: {
    backgroundColor: "#7EB6FF",
    paddingBottom: 40,
  },

  curvedBackground: {
    backgroundColor: "#7EB6FF",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 40,
  },

  whiteCurve: {
    position: "absolute",
    top: 80,
    width: "130%",
    height: 140,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
    marginTop: -20,
  },

  infoBox: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },

  infoText: {
    fontSize: 16,
    color: "#000",
    marginVertical: 4,
    fontWeight: "600",
  },

  buttonsContainer: {
    alignItems: "center",
    gap: 14,
  },

  actionButton: {
    backgroundColor: "#4C8DFF",
    width: "70%",
    paddingVertical: 12,
    borderRadius: 10,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
