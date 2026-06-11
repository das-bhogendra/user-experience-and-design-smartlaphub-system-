import { AuthProvider } from "./contexts/AuthContext.jsx";
import ShopContextProvider from "./contexts/ShopContext.jsx";

// Central place to wrap global providers.
// Ensures AuthContext is available to components like LoginForm.
const AppProviders = ({ children }) => {
  return (
    <ShopContextProvider>
      <AuthProvider>{children}</AuthProvider>
    </ShopContextProvider>
  );
};

export default AppProviders;

