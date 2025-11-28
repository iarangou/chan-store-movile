import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import RightCartMenu from "../../components/RightCartMenu";

export default function StoreChangeOrderStage() {
  const [showCart, setShowCart] = useState(false);

  // Estado actual de la orden (ejemplo real vendrá del backend)
  const [stage, setStage] = useState("pendiente");

  const orderId = "12345";

  return (
    <View style={styles.container}>

      {/* Panel lateral carrito */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />
        <Text style={styles.headerTitle}>Cambiar etapa</Text>
        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ---------- CONTENIDO ---------- */}
      <ScrollView contentContainerStyle={styles.content}>

        {/* Info básica */}
        <Text style={styles.label}>Número de orden</Text>
        <Text style={styles.value}>{orderId}</Text>

        <Text style={styles.label}>Estado actual</Text>
        <Text style={styles.value}>{stage}</Text>

        {/* ---------- Opciones de etapa ---------- */}
        <Text style={styles.sectionTitle}>Seleccionar nueva etapa</Text>

        <TouchableOpacity
          style={[styles.stageButton, stage === "pendiente" && styles.stageActive]}
          onPress={() => setStage("pendiente")}
        >
          <Text
            style={[
              styles.stageText,
              stage === "pendiente" && styles.stageTextActive,
            ]}
          >
            Pendiente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.stageButton, stage === "procesado" && styles.stageActive]}
          onPress={() => setStage("procesado")}
        >
          <Text
            style={[
              styles.stageText,
              stage === "procesado" && styles.stageTextActive,
            ]}
          >
            Procesado
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.stageButton, stage === "enviado" && styles.stageActive]}
          onPress={() => setStage("enviado")}
        >
          <Text
            style={[
              styles.stageText,
              stage === "enviado" && styles.stageTextActive,
            ]}
          >
            Enviado
          </Text>
        </TouchableOpacity>

        {/* ---------- BOTÓN GUARDAR ---------- */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Guardar cambios</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

/* ---------- ESTILOS ---------- */

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

  label: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },

  value: {
    fontSize: 15,
    color: "#333",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 14,
    color: "#4C8DFF",
  },

  stageButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: "#E6EEFA",
    marginBottom: 12,
  },

  stageActive: {
    backgroundColor: "#4C8DFF",
  },

  stageText: {
    color: "#4C8DFF",
    fontSize: 16,
    fontWeight: "600",
  },

  stageTextActive: {
    color: "#fff",
  },

  saveButton: {
    backgroundColor: "#4C8DFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
  },

  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
