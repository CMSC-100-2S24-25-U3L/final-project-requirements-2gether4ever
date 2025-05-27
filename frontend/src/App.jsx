import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // adjust if path differs

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
