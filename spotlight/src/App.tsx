import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <div>
        <QueryClientProvider client={queryClient}></QueryClientProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Suspense fallback={"Loading"}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
