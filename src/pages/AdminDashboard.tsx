import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Shield, Mail, Users, RefreshCw, Download, CheckCircle, XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface EmailNotification {
  id: string;
  name: string;
  email: string;
  is_confirmed: boolean;
  reminder_sent: boolean;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState<EmailNotification[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUserProfile(null);
          navigate('/auth');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        navigate('/auth');
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (!error) {
        setUserProfile(data);
        
        // Check if user is admin
        if (data.role !== 'admin') {
          setError('Access denied. Admin privileges required.');
          setTimeout(() => navigate('/'), 3000);
        } else {
          fetchEmailNotifications();
        }
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('Error loading user profile');
    }
  };

  const fetchEmailNotifications = async () => {
    setLoadingNotifications(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.rpc('admin_get_email_notifications');
      
      if (error) {
        throw error;
      }
      
      setEmailNotifications(data || []);
    } catch (err: any) {
      console.error('Error fetching email notifications:', err);
      setError(`Failed to load email notifications: ${err.message}`);
    } finally {
      setLoadingNotifications(false);
    }
  };

  const exportToCSV = () => {
    if (emailNotifications.length === 0) return;
    
    const headers = ['Name', 'Email', 'Confirmed', 'Reminder Sent', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...emailNotifications.map(notification => [
        `"${notification.name}"`,
        `"${notification.email}"`,
        notification.is_confirmed ? 'Yes' : 'No',
        notification.reminder_sent ? 'Yes' : 'No',
        `"${new Date(notification.created_at).toLocaleDateString()}"`
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `email-notifications-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    document.title = 'Admin Dashboard - Genius Recovery';
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || userProfile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Admin privileges required to access this page.</p>
            <Button onClick={() => navigate('/')} className="mt-4 w-full">
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Welcome, {userProfile?.full_name}. Manage platform content and user data.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Email Notifications Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Notifications
                </CardTitle>
                <CardDescription>
                  Manage and view all email newsletter subscriptions
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={fetchEmailNotifications}
                  disabled={loadingNotifications}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loadingNotifications ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  onClick={exportToCSV}
                  disabled={emailNotifications.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-medium">Total Subscribers:</span>
                <Badge variant="secondary">{emailNotifications.length}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="font-medium">Confirmed:</span>
                <Badge variant="secondary">
                  {emailNotifications.filter(n => n.is_confirmed).length}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-orange-500" />
                <span className="font-medium">Pending:</span>
                <Badge variant="secondary">
                  {emailNotifications.filter(n => !n.is_confirmed).length}
                </Badge>
              </div>
            </div>

            {loadingNotifications ? (
              <div className="text-center py-8">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                <p>Loading email notifications...</p>
              </div>
            ) : emailNotifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No email notifications found</p>
              </div>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reminder</TableHead>
                      <TableHead>Subscribed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emailNotifications.map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell className="font-medium">{notification.name}</TableCell>
                        <TableCell>{notification.email}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={notification.is_confirmed ? "default" : "secondary"}
                            className={notification.is_confirmed ? "bg-green-100 text-green-800" : ""}
                          >
                            {notification.is_confirmed ? 'Confirmed' : 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={notification.reminder_sent ? "outline" : "secondary"}
                          >
                            {notification.reminder_sent ? 'Sent' : 'Not Sent'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(notification.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Security Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              ✅ Email addresses are now fully protected with RLS policies<br />
              ✅ Only authenticated administrators can access this data<br />
              ✅ All access is logged and monitored for security
            </p>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;