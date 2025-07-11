
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';

const GOLD = '#C2891A';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-womb-charcoal flex items-center justify-center">
        <div className="text-womb-softwhite">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-womb-charcoal flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #888888 100%)` }}
            >
              <Heart className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-playfair font-bold text-womb-softwhite mb-2">
            Welcome to WombVerse
          </h1>
          <p className="text-womb-warmgrey">
            {isSignUp 
              ? "Join our community and share your story" 
              : "Welcome back to your safe space"
            }
          </p>
        </div>
        <div
          className="bg-womb-deepgrey rounded-lg p-6 border-2"
          style={{ borderColor: GOLD }}
        >
          {isSignUp ? <SignUpForm /> : <SignInForm />}
          <div className="mt-6 text-center">
            <p className="text-womb-warmgrey text-sm">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </p>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              style={{ color: GOLD }}
              className="hover:opacity-80 font-medium text-sm mt-1 transition-colors"
            >
              {isSignUp ? "Sign in here" : "Create your account"}
            </button>
          </div>
        </div>
        <div className="text-center">
          <p className="text-womb-warmgrey text-xs">
            By joining WombVerse, you're entering a safe space for sharing and healing.
            <br />
            Your stories matter. Your voice matters. You matter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
