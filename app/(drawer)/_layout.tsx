import { Drawer } from 'expo-router/drawer';
import CustomDrawer from './menu';

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        drawerStyle: {
          width: 280,
          backgroundColor: "transparent",
        },
      }}
    />
  );
}
