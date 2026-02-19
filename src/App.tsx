import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import MusicPage from "./pages/MusicPage";
import OurStoryPage from "./pages/OurStoryPage";
import LetterPage from "./pages/LetterPage";
import AlbumPage from "./pages/AlbumPage";
import FormPage from "./pages/FormPage";
import RespostasPage from "./pages/RespostasPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Public Route - redirects to home if already logged in
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/musicas" element={<ProtectedRoute><MusicPage /></ProtectedRoute>} />
      <Route path="/nossa-historia" element={<ProtectedRoute><OurStoryPage /></ProtectedRoute>} />
      <Route path="/carta" element={<ProtectedRoute><LetterPage /></ProtectedRoute>} />
      <Route path="/album" element={<ProtectedRoute><AlbumPage /></ProtectedRoute>} />
      <Route path="/formulario" element={<ProtectedRoute><FormPage /></ProtectedRoute>} />
      <Route path="/respostas" element={<ProtectedRoute><RespostasPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
