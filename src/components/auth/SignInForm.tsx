
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in to WombVerse.",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="Enter your password"
            className="pl-10 pr-10 bg-womb-charcoal border-womb-charcoal text-womb-softwhite placeholder-womb-warmgrey focus:border-womb-crimson"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-womb-warmgrey hover:text-womb-softwhite transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Forgot Password */}
      <div className="text-right">
        <button
          type="button"
          className="text-[#FFD700] hover:text-[#FFD700]/80 text-sm transition-colors"
        >
          Forgot your password?
        </button>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary h-12 text-base font-medium border-2 border-[#FFD700] hover:border-[#FFD700]/80"
      >
        {isLoading ? "Signing you in..." : "Sign In"}
      </Button>
    </form>
  );
};

export default SignInForm;
