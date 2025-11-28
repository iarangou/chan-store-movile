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
import RightCartMenu from "../../../components/RightCartMenu";

export default function FaqScreen() {
  const [showCart, setShowCart] = useState(false);

  // Ejemplo de preguntas — puedes poner las reales después
  const faqs = [
    {
      id: 1,
      question: "¿Cómo puedo hacer un pedido?",
      lines: 4,
    },
    {
      id: 2,
      question: "¿Qué métodos de pago aceptan?",
      lines: 4,
    },
    {
      id: 3,
      question: "¿Cuánto tarda el envío?",
      lines: 4,
    },
    {
      id: 4,
      question: "¿Puedo devolver un producto?",
      lines: 4,
    },
  ];

  return (
    <View style={styles.container}>

      {/* Menú carrito derecho */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />
        <Text style={styles.headerTitle}>Preguntas frecuentes</Text>
        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ---------- CONTENIDO ---------- */}
      <ScrollView contentContainerStyle={styles.content}>
        {faqs.map((item) => (
          <View key={item.id} style={styles.faqBox}>
            <Text style={styles.question}>{item.question}</Text>

            {/* Líneas punteadas simulando texto */}
            {Array(item.lines)
              .fill(0)
              .map((_, index) => (
                <Text key={index} style={styles.dottedLine}>
                  ---------------------------------------------
                </Text>
              ))}
          </View>
        ))}
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
    paddingBottom: 60,
  },

  faqBox: {
    marginBottom: 25,
  },

  question: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4C8DFF",
    marginBottom: 8,
  },

  dottedLine: {
    color: "#4C8DFF",
    marginBottom: 3,
  },
});
