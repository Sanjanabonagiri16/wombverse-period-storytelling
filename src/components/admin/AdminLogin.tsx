
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
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

    try {
      // Check for demo credentials first
      if (email === 'admin@wombverse.com' && password === 'WombVerse2025!') {
        console.log('Demo credentials validated, calling onLoginSuccess');
        toast({
          title: "Demo Login Successful",
          description: "Welcome to the admin dashboard (demo mode).",
        });
        onLoginSuccess();
        return;
      }

      // If not demo credentials, show error about using demo credentials
      toast({
        title: "Invalid Credentials",
        description: "Please use the demo credentials: admin@wombverse.com / WombVerse2025!",
        variant: "destructive",
      });

    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Please use demo credentials: admin@wombverse.com / WombVerse2025!",
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
            Use demo credentials for access
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
                placeholder="admin@wombverse.com"
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
                  placeholder="WombVerse2025!"
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
          
          <div className="mt-6 p-3 bg-womb-charcoal rounded-lg border border-womb-deepgrey">
            <p className="text-xs text-womb-warmgrey text-center">
              <strong>Demo Credentials:</strong><br />
              Email: admin@wombverse.com<br />
              Password: WombVerse2025!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
