import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import RightCartMenu from "../../../components/RightCartMenu";

export default function UpdateData() {
  const [showCart, setShowCart] = useState(false);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");

  return (
    <View style={styles.container}>
      {/* Carrito derecho */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>

        {/* Menú izquierdo */}
        <DrawerToggleButton tintColor="#fff" />

        {/* Título */}
        <Text style={styles.headerTitle}>Actualizar Datos</Text>

        {/* Carrito */}
        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ---------- CONTENIDO ---------- */}
      <ScrollView contentContainerStyle={styles.content}>

        {/* Fondo curvo + foto */}
        <View style={styles.curvedArea}>
          <View style={styles.whiteCurve} />

          <Image
            source={{ uri: "https://i.pravatar.cc/200" }}
            style={styles.avatar}
          />

          {/* Botón editar foto */}
          <TouchableOpacity style={styles.editPhotoBtn}>
            <Ionicons name="create-outline" size={28} color="#0F2A50" />
          </TouchableOpacity>
        </View>

        {/* ---------------------- NOMBRE ---------------------- */}
        <Text style={styles.labelBold}>
          Nombre Actual: <Text style={styles.labelLight}>Pepita Perez</Text>
        </Text>

        <TextInput
          placeholder="Escriba aqui su nuevo nombre"
          style={styles.input}
          placeholderTextColor="#777"
          value={newName}
          onChangeText={setNewName}
        />

        {/* ---------------------- TELÉFONO ---------------------- */}
        <Text style={styles.labelBold}>
          Numero Actual:{" "}
          <Text style={styles.labelLight}>+57 1234567890</Text>
        </Text>

        <View style={styles.phoneRow}>
          <View style={styles.indicativeBox}>
            <Text style={styles.indicativeText}>+57</Text>
            <Ionicons name="chevron-down" size={18} color="#333" />
          </View>

          <TextInput
            placeholder="Escriba aqui su nuevo numero"
            style={[styles.input, { flex: 1 }]}
            placeholderTextColor="#777"
            value={newPhone}
            onChangeText={setNewPhone}
          />
        </View>

        {/* ---------------------- DIRECCIÓN ---------------------- */}
        <Text style={styles.labelBold}>
          Direccion Actual:{" "}
          <Text style={styles.labelLight}>Cra 5 # 27-41</Text>
        </Text>

        <TextInput
          placeholder="Escriba aqui su nueva direccion"
          style={styles.input}
          placeholderTextColor="#777"
          value={newAddress}
          onChangeText={setNewAddress}
        />

        {/* BOTÓN ACTUALIZAR */}
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Actualizar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* ---------------------- ESTILOS ---------------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

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
    fontSize: 18,
    fontWeight: "700",
  },

  content: {
    padding: 16,
    backgroundColor: "#7EB6FF",
    paddingBottom: 40,
  },

  /* FOTO + CURVA */
  curvedArea: {
    alignItems: "center",
    marginBottom: 20,
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
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: "#fff",
    marginTop: -10,
  },

  editPhotoBtn: {
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 30,
    position: "absolute",
    right: "32%",
    bottom: 20,
  },

  /* CAMPOS */
  labelBold: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    color: "#000",
  },
  labelLight: {
    fontWeight: "400",
  },

  input: {
    backgroundColor: "#DDE7F9",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: "#333",
  },

  /* TELÉFONO */
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  indicativeBox: {
    backgroundColor: "#DDE7F9",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
  },

  indicativeText: {
    fontSize: 16,
    marginRight: 4,
    color: "#333",
  },

  /* BOTÓN */
  updateButton: {
    backgroundColor: "#4C8DFF",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
