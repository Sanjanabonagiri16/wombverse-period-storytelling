
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: displayName,
          },
        },
      });

      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        toast({
          title: "Welcome to WombVerse!",
          description: "Please check your email to confirm your account.",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Display Name Field */}
      <div className="space-y-2">
        <Label htmlFor="displayName" className="text-womb-softwhite">
          Display Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-womb-warmgrey w-4 h-4" />
          <Input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="How should we call you?"
            className="pl-10 bg-womb-charcoal border-womb-charcoal text-womb-softwhite placeholder-womb-warmgrey focus:border-womb-crimson"
            required
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-womb-softwhite">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-womb-warmgrey w-4 h-4" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="pl-10 bg-womb-charcoal border-womb-charcoal text-womb-softwhite placeholder-womb-warmgrey focus:border-womb-crimson"
            required
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-womb-softwhite">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-womb-warmgrey w-4 h-4" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a secure password"
            className="pl-10 pr-10 bg-womb-charcoal border-womb-charcoal text-womb-softwhite placeholder-womb-warmgrey focus:border-womb-crimson"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-womb-warmgrey hover:text-womb-softwhite transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-xs text-womb-warmgrey">
          Password must be at least 6 characters long
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary h-12 text-base font-medium border-2 border-[#FFD700] hover:border-[#FFD700]/80"
      >
        {isLoading ? "Creating your account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default SignUpForm;
