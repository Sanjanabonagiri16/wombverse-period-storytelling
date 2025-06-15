
import { useState } from 'react';
import { Heart } from 'lucide-react';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-womb-charcoal flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-womb-crimson to-womb-plum rounded-full flex items-center justify-center">
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

        {/* Auth Form */}
        <div className="bg-womb-deepgrey rounded-lg p-6 border border-womb-deepgrey">
          {isSignUp ? <SignUpForm /> : <SignInForm />}
          
          {/* Toggle between sign in/up */}
          <div className="mt-6 text-center">
            <p className="text-womb-warmgrey text-sm">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </p>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-womb-crimson hover:text-womb-crimson/80 font-medium text-sm mt-1 transition-colors"
            >
              {isSignUp ? "Sign in here" : "Create your account"}
            </button>
          </div>
        </div>

        {/* Footer message */}
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
