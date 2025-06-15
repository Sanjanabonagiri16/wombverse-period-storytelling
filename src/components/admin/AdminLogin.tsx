
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Login attempt with:', { email: email.trim() });

    try {
      // Check for demo credentials
      if (email.trim() === 'admin@wombverse.com' && password.trim() === 'WombVerse2025!') {
        console.log('Demo credentials validated successfully');
        toast({
          title: "Login Successful",
          description: "Welcome to the WombVerse admin dashboard.",
        });
        setTimeout(() => {
          onLoginSuccess();
        }, 100);
        return;
      }

      // If credentials don't match, show error
      console.log('Invalid credentials provided');
      toast({
        title: "Invalid Credentials",
        description: "Please check your email and password.",
        variant: "destructive",
      });

    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-womb-charcoal via-womb-deepgrey to-womb-charcoal flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-womb-deepgrey/90 border-[#FFD700] border-2 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-womb-softgray rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-womb-softwhite">
            Admin Access
          </CardTitle>
          <p className="text-womb-warmgrey text-sm">
            Secure administrator portal
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-womb-softwhite">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-womb-charcoal/50 border-womb-warmgrey/30 text-womb-softwhite placeholder:text-womb-warmgrey/60"
                required
                placeholder="Enter your admin email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-womb-softwhite">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-womb-charcoal/50 border-womb-warmgrey/30 text-womb-softwhite placeholder:text-womb-warmgrey/60 pr-10"
                  required
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-womb-warmgrey hover:text-womb-softwhite"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FFD700] to-womb-softgray hover:from-[#FFD700]/90 hover:to-womb-softgray/90 text-womb-charcoal font-medium border-2 border-[#FFD700]"
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
