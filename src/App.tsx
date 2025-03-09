
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import CommunitiesPage from "./pages/CommunitiesPage";
import CommunityDetailsPage from "./pages/CommunityDetailsPage";
import CreateCommunityPage from "./pages/CreateCommunityPage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import CreateArticlePage from "./pages/CreateArticlePage";
import MeetPage from "./pages/MeetPage";
import CreateMeetPage from "./pages/CreateMeetPage";
import MeetupDetailsPage from "./pages/MeetupDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/communities" element={<CommunitiesPage />} />
              <Route path="/communities/create" element={<CreateCommunityPage />} />
              <Route path="/communities/:id" element={<CommunityDetailsPage />} />
              <Route path="/articles" element={<ArticlesPage />} />
              <Route path="/articles/create" element={<CreateArticlePage />} />
              <Route path="/articles/:id" element={<ArticleDetailsPage />} />
              <Route path="/meet" element={<MeetPage />} />
              <Route path="/meet/create" element={<CreateMeetPage />} />
              <Route path="/meet/:id" element={<MeetupDetailsPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
