import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}
