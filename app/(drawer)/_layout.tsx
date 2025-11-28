import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,  // Ocultamos header porque tú usas un header propio
        drawerType: "slide",
        drawerStyle: {
          width: 280,
        },
      }}
    />
  );
}
