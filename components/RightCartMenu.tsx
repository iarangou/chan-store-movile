import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function RightCartMenu({ visible, onClose }: Props) {
  const translateX = useSharedValue(400); // empieza fuera de pantalla

  useEffect(() => {
    translateX.value = visible ? withTiming(0, { duration: 300 }) : withTiming(400, { duration: 300 });
  }, [visible]);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      {/* Cerrar si toca fuera */}
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />

      <Animated.View style={[styles.panel, panelStyle]}>
        
        {/* Encabezado */}
        <View style={styles.header}>
          <Image
            source={require("../assets/image/cart.png")}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <View style={styles.cartNumber}>
            <Text style={styles.cartNumberText}>1</Text>
          </View>
        </View>

        {/* Producto */}
        <View style={styles.itemBox}>
          <View style={styles.productImage} />

          <View style={styles.counterRow}>
            <TouchableOpacity style={styles.counterButton}>
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.counterValue}>1</Text>

            <TouchableOpacity style={styles.counterButton}>
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>

            <Text style={styles.priceText}>Precio</Text>
          </View>

          <View style={styles.line} />
        </View>

        {/* Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalLabel}>Precio</Text>
        </View>

        {/* Check Out */}
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Check out</Text>
        </TouchableOpacity>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  panel: {
    width: "75%",
    backgroundColor: "#7EB6FF",
    padding: 16,
    borderLeftWidth: 3,
    borderColor: "#1E3A8A",
  },

  // Header
  header: {
    backgroundColor: "#143D6B",
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
  },
  headerImage: {
    width: 50,
    height: 50,
  },
  cartNumber: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#A7C7FF",
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  cartNumberText: {
    color: "#fff",
    fontWeight: "600",
  },

  // Product card
  itemBox: {
    marginBottom: 20,
  },
  productImage: {
    width: 140,
    height: 100,
    backgroundColor: "#D9D9D9",
    alignSelf: "center",
    marginBottom: 10,
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    backgroundColor: "#AECBFF",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  counterText: {
    color: "#143D6B",
    fontSize: 20,
  },
  counterValue: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  priceText: {
    marginLeft: "auto",
    color: "#000",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  line: {
    marginTop: 10,
    height: 1,
    backgroundColor: "#000",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    marginBottom: 20,
  },
  totalLabel: {
    fontWeight: "700",
    fontSize: 16,
    color: "#000",
    textDecorationLine: "underline",
  },

  checkoutButton: {
    backgroundColor: "#4C8DFF",
    paddingVertical: 14,
    borderRadius: 50,
  },
  checkoutText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
