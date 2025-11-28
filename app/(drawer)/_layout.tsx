import { Drawer } from "expo-router/drawer";
import CustomDrawer from "../../components/menu/menu"; // AJUSTA LA RUTA SEGÚN TU PROYECTO

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        drawerStyle: {
          width: 280,
        },
      }}

      drawerContent={(props) => <CustomDrawer {...props} />}
    />
  );
}
