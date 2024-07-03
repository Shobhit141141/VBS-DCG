import "./App.css";
import Book from "./pages/Book";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import LoginForm from "./pages/Login";
import SignUpForm from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import MySlots from "./pages/MySlots";
import Contact from "./pages/Contact";
import Holidays from "./pages/Holidays";
import Event from "./pages/SingleEvent";
import { useContext, useEffect } from "react";
import { BackgroundContext } from "./context/BgContext";
function App() {
  const { background, handleBg } = useContext(BackgroundContext);
  useEffect(() => {
    handleBg();
  }, []);
  return (
    <>
      <div
        className="main"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <BrowserRouter>
          <Toaster />
          <Nav />
          <Routes>
            <Route path="/Login" element={<LoginForm />} />
            <Route path="/Signup" element={<SignUpForm />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/Book" element={<Book />} />
              <Route path="/event/:id" element={<Event />} />
              <Route path="/my-slots" element={<MySlots />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/Holidays" element={<Holidays />} />
            </Route>
          </Routes>
          <Toaster />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
