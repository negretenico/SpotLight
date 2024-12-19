import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import Feed from "./pages/private/Feed";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div>
          <QueryClientProvider client={queryClient}>
            <ToastContainer position="top-right" autoClose={3000} />
            <Suspense fallback={"Loading"}>
              <Routes>
                <Route
                  path={"/"}
                  element={
                    <ProtectedRoutes>
                      <Feed />
                    </ProtectedRoutes>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </Suspense>
          </QueryClientProvider>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
