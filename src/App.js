import "./App.css";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { AppProvider } from "./components/context/AppContext";

function App() {
  return (
    <AppProvider>
      <Header />
      <Content />
      <Footer />
    </AppProvider>
  );
}

export default App;
