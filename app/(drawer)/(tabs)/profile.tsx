import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { router } from "expo-router";
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
        <Button label="Métodos de pago" href="/(drawer)/(tabs)/payment-methods" />
        <Button label="Actualizar datos" href="/(drawer)/(tabs)/update-data" />
        <Button label="Cambiar correo" href="/(drawer)/(tabs)/change-email" />
        <Button label="Cambiar contraseña" href="/(drawer)/(tabs)/change-password" />

      </ScrollView>
    </View>
  );
}

/* COMPONENTE REUTILIZABLE PARA LOS BOTONES */
function Button({ label, href }: any) {
  return (
    <TouchableOpacity 
      style={styles.actionButton}
      onPress={() => router.push(href)}
    >
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
    paddingBottom: 300,
    alignItems: "center",    // ← AGREGA ESTO
  },


  curvedBackground: {
    backgroundColor: "#7EB6FF",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 40,
  },

  whiteCurve: {
    position: "absolute",
    top: 0,
    width: "130%",
    height: 460,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },

  avatar: {
    width: 220,
    height: 220,
    borderRadius: 130,
    borderWidth: 4,
    borderColor: "#fff",
    marginTop: -20,
  },

  infoBox: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 50,
  },

  infoText: {
    fontSize: 16,
    color: "#000",
    marginVertical: 4,
    fontWeight: "600",
  },

  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },


  actionButton: {
    backgroundColor: "#4C8DFF",
    width: "70%",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 16,
  },

  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
