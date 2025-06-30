import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import CreateStory from "./pages/CreateStory";
import Stories from "./pages/Stories";
import Whispers from "./pages/Whispers";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import MoodStories from "./pages/MoodStories";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import FeaturedStories from "./pages/FeaturedStories";
import RecentStories from "./pages/RecentStories";
import PopularTags from "./pages/PopularTags";
import Guidelines from "./pages/Guidelines";
import Support from "./pages/Support";
import Resources from "./pages/Resources";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import SupabaseStatus from "./components/ui/SupabaseStatus";

const queryClient = new QueryClient();

const SupabaseConnectionGuard = ({ children }: { children: React.ReactNode }) => {
  const isSupabaseConfigured =
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!isSupabaseConfigured) {
    return (
      <div style={{
        backgroundColor: '#1a0000',
        color: '#ffcccc',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'monospace',
        padding: '2rem',
        textAlign: 'center',
        border: '2px solid #ffcccc',
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Configuration Error</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
          The application is not configured to connect to the database.
          <br />
          Please ensure that <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> are set in your environment variables.
        </p>
        <p style={{ marginTop: '2rem', fontSize: '1rem' }}>
          If this is a local environment, create a <code>.env</code> file. If this is a deployed site, check your hosting provider's settings.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

const App = () => (
  <SupabaseConnectionGuard>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <SupabaseStatus />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/create-story" element={<CreateStory />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/whispers" element={<Whispers />} />
            <Route path="/community" element={<Community />} />
            <Route path="/mood-stories" element={<MoodStories />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/featured-stories" element={<FeaturedStories />} />
            <Route path="/recent-stories" element={<RecentStories />} />
            <Route path="/popular-tags" element={<PopularTags />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/support" element={<Support />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </SupabaseConnectionGuard>
);

export default App;
