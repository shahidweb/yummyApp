import { BrowserRouter } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./router/AppRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <AppRoutes />
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
