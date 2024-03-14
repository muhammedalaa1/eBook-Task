import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ReactNode } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Nav from "./components/Navbar";
import { authenticated } from "./context/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Book from "./components/Book";
import AddBook from "./components/AddBook";
function Protect({
  protect = false,
  children,
  destination,
}: {
  children: ReactNode;
  protect?: boolean;
  destination?: string;
}) {
  const authed = authenticated();
  if (authed === true && (destination === "login" || destination === "signup"))
    return <Navigate to={"/"} />;
  if (authed === protect) return <Navigate to={"/login"} />;
  else return children;
}
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route
          path="/login"
          element={
            <Protect protect destination="login">
              <Login />
            </Protect>
          }
        />
        <Route
          path="/signup"
          element={
            <Protect destination="signup">
              <Signup />
            </Protect>
          }
        />{" "}
        <Route path="/" element={<Home />} />
        <Route
          path="/add"
          element={
            <Protect>
              <AddBook />
            </Protect>
          }
        />
        <Route path="/book/:id" element={<Book />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
