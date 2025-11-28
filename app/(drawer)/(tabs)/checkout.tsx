import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import RightCartMenu from "../../../components/RightCartMenu";

export default function Checkout() {
  const [showCart, setShowCart] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("card");

  // Productos de ejemplo
  const products = [
    { id: 1, name: "Nombre producto", price: 20000, qty: 1 },
    { id: 2, name: "Nombre producto", price: 15000, qty: 2 },
    { id: 3, name: "Nombre producto", price: 35000, qty: 1 },
  ];

  return (
    <View style={styles.container}>

      {/* MENÚ DESLIZABLE */}
      <RightCartMenu visible={showCart} onClose={() => setShowCart(false)} />

      {/* ----------------- HEADER ----------------- */}
      <View style={styles.header}>
        <DrawerToggleButton tintColor="#fff" />

        <Text style={styles.headerTitle}>Mi carrito</Text>

        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ----------------- LISTA DE PRODUCTOS ----------------- */}
      <ScrollView style={styles.scrollArea}>

        {products.map((item) => (
          <View key={item.id} style={styles.productCard}>
            {/* Imagen */}
            <View style={styles.productImage} />

            {/* Info */}
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>

              <Text style={styles.productQty}>
                Cantidad: {item.qty}
              </Text>

              <Text style={styles.productPrice}>
                Precio: ${item.price}
              </Text>
            </View>
          </View>
        ))}

      </ScrollView>

      {/* ----------------- FOOTER CHECKOUT ----------------- */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          impuestos______________________________
        </Text>

        <Text style={styles.footerText}>
          total___________________________________
        </Text>

        <Text style={styles.label}>Dirección de envio</Text>
        <TextInput
          placeholder="Ingrese su dirección"
          style={styles.input}
          placeholderTextColor="#777"
        />

        {/* MÉTODOS DE PAGO */}
        <View style={styles.paymentRow}>
          <TouchableOpacity onPress={() => setPaymentMethod("card")}>
            <View style={styles.radioRow}>
              <View
                style={[
                  styles.radioCircle,
                  paymentMethod === "card" && styles.radioSelected,
                ]}
              />
              <Text style={styles.radioLabel}>Tarjeta</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setPaymentMethod("pse")}>
            <View style={styles.radioRow}>
              <View
                style={[
                  styles.radioCircle,
                  paymentMethod === "pse" && styles.radioSelected,
                ]}
              />
              <Text style={styles.radioLabel}>PSE</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* BOTÓN PAGAR */}
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Pagar ahora</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

/* ----------------- ESTILOS ----------------- */

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: "#fff" },

  /* HEADER */
  header: {
    backgroundColor: "#0F2A50",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 45,
    paddingBottom: 12,
    paddingHorizontal: 14,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  /* PRODUCTOS */
  scrollArea: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  productCard: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  productImage: {
    width: 90,
    height: 90,
    backgroundColor: "#d7dce1",
    borderRadius: 8,
  },
  productInfo: {
    marginLeft: 15,
    justifyContent: "center",
  },
  productName: {
    fontWeight: "700",
    fontSize: 16,
  },
  productQty: {
    marginTop: 4,
    color: "#555",
  },
  productPrice: {
    marginTop: 4,
    fontWeight: "600",
    color: "#000",
  },

  /* FOOTER CHECKOUT */
  footer: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 2,
    borderColor: "#ddd",
  },

  footerText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#000",
  },

  label: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "700",
  },

  input: {
    backgroundColor: "#E4E9F2",
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },

  /* Radio buttons */
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#555",
    marginRight: 6,
  },
  radioSelected: {
    backgroundColor: "#4C8DFF",
    borderColor: "#4C8DFF",
  },
  radioLabel: {
    fontSize: 15,
  },

  /* BOTÓN PAGAR */
  payButton: {
    backgroundColor: "#4C8DFF",
    paddingVertical: 14,
    borderRadius: 10,
  },
  payButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
