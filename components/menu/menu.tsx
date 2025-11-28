import { Entypo, Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomDrawer(props: any) {
  return (
    <DrawerContentScrollView 
      {...props} 
      contentContainerStyle={styles.container}
    >
      {/* Avatar y nombre */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />
        <Text style={styles.username}>User</Text>
      </View>

      {/* Opciones */}
      <View style={styles.menuBox}>
        <MenuItem icon="home-outline" title="Inicio" href="/(drawer)/(tabs)" />
        <MenuItem icon="person-outline" title="Perfil" href="/(drawer)/(tabs)/profile" />
        <MenuItem icon="cart-outline" title="Pedidos" href="/(drawer)/(tabs)/orders" />
        <MenuItem icon="storefront-outline" title="Mi tienda" href="/(drawer)/(tabs)/my-store" />
        <MenuItem icon="help-circle-outline" title="Ayuda" href="/(drawer)/(tabs)/FaqScreen" />
        <MenuItem icon="heart-outline" title="Favoritos" href="/(drawer)/(tabs)/favorites" />
      </View>


      {/* Imagen inferior */}
      <Image
        source={require("../../assets/images/cart.png")}
        style={styles.bottomImage}
        resizeMode="contain"
      />

      {/* Cerrar sesión */}
      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.logout}>Cerrar sesion</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

function MenuItem({ icon, title, href }: any) {
  return (
    <TouchableOpacity 
      style={styles.menuItem} 
      onPress={() => router.push(href)}
    >
      <Ionicons name={icon} size={22} color="black" />
      <Text style={styles.menuText}>{title}</Text>
      <Entypo name="chevron-right" size={20} color="black" />
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 30,
    backgroundColor: "#6CA9FF", // azul del Figma
    flex: 1,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginBottom: 10,
  },

  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },

  menuBox: {
    backgroundColor: "#77B5FF",
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 40,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },

  menuText: {
    flex: 1,
    fontSize: 16,
    color: "black",
    marginLeft: 12,
  },

  bottomImage: {
    width: 140,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },

  logout: {
    textAlign: "center",
    color: "white",
    marginTop: 10,
    fontWeight: "600",
    fontSize: 16,
  },
});
