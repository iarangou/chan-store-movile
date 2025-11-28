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

export default function AddCard() {
  const [showCart, setShowCart] = useState(false);

  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");

  return (
    <View style={styles.container}>
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* -------- HEADER -------- */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />

        <Text style={styles.headerTitle}>Añadir metodo de pago</Text>

        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* -------- CONTENIDO -------- */}
      <ScrollView contentContainerStyle={styles.content}>

        {/* TÍTULO PRINCIPAL */}
        <Text style={styles.pageTitle}>Añadir metodo de pago</Text>

        {/* Nombre Titular */}
        <Text style={styles.label}>Nombre titular</Text>
        <TextInput
          placeholder="Escriba aqui su nombre"
          placeholderTextColor="#777"
          style={styles.input}
          value={holder}
          onChangeText={setHolder}
        />

        {/* Número tarjeta */}
        <Text style={styles.label}>Numero de tarjeta</Text>
        <TextInput
          placeholder="Escriba aqui su nombre"
          placeholderTextColor="#777"
          style={styles.input}
          keyboardType="numeric"
          value={number}
          onChangeText={setNumber}
        />

        {/* FECHA + CVC */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Fecha de vencimiento</Text>
            <TextInput
              placeholder="MM/YY"
              placeholderTextColor="#777"
              style={styles.inputSmall}
              value={expDate}
              onChangeText={setExpDate}
            />
          </View>

          <View style={{ width: 80 }}>
            <Text style={styles.label}>cvc</Text>
            <TextInput
              placeholder="XXX"
              placeholderTextColor="#777"
              style={styles.inputSmall}
              keyboardType="numeric"
              value={cvc}
              onChangeText={setCvc}
            />
          </View>
        </View>

        {/* BOTÓN AÑADIR */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Añadir tarjeta</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

/* ---------------- ESTILOS ---------------- */

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
    paddingHorizontal: 14,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  /* CONTENIDO */
  content: {
    padding: 16,
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4C8DFF",
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
    color: "#000",
  },

  input: {
    backgroundColor: "#DDE7F9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    color: "#333",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },

  inputSmall: {
    backgroundColor: "#DDE7F9",
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    color: "#333",
  },

  addButton: {
    backgroundColor: "#4C8DFF",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
