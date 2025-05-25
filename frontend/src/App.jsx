import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authcontext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Books from "./pages/Books";
import Space from "./pages/Space";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Container } from "@mui/material";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/books" element={<Books />} />
            <Route path="/space" element={<Space />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
