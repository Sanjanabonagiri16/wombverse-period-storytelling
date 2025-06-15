
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
  const [email, setEmail] = useState('admin@wombverse.com');
  const [password, setPassword] = useState('WombVerse2025!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Login attempt with:', { email, password });

    try {
      // Check for demo credentials
      if (email.trim() === 'admin@wombverse.com' && password.trim() === 'WombVerse2025!') {
        console.log('Demo credentials validated successfully');
        toast({
          title: "Demo Login Successful",
          description: "Welcome to the admin dashboard (demo mode).",
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
    <div className="min-h-screen bg-womb-charcoal flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-womb-deepgrey border-womb-deepgrey">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-womb-crimson to-womb-plum rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-womb-softwhite">
            Admin Access
          </CardTitle>
          <p className="text-womb-warmgrey text-sm">
            Secure administrator login
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
                className="bg-womb-charcoal border-womb-deepgrey text-womb-softwhite"
                required
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
                  className="bg-womb-charcoal border-womb-deepgrey text-womb-softwhite pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-womb-warmgrey hover:text-womb-softwhite"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-womb-crimson to-womb-plum hover:from-womb-crimson/80 hover:to-womb-plum/80"
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
