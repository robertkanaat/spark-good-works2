import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, User, LogOut, Settings, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user profile when user logs in
        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUserProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (!error) {
        setUserProfile(data);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
  };

  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <img 
                src="/genius-recovery-uploads/503e117d-b085-47e8-916d-ecb3995e75e9.png"
                alt="Genius Recovery" 
                className="w-[240px] h-auto transition-opacity group-hover:opacity-80"
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link to="/about" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-muted/50 rounded-md relative overflow-hidden group">
                <span className="relative z-10">ABOUT</span>
                <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
              <Link to="/emergency" className="text-muted-foreground hover:text-red-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-110 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md relative overflow-hidden group hover:shadow-lg hover:shadow-red-500/25">
                <span className="relative z-10 font-semibold">EMERGENCY</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="absolute inset-0 animate-pulse bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link to="/resources" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-muted/50 rounded-md relative overflow-hidden group">
                <span className="relative z-10">RESOURCES</span>
                <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-muted/50 rounded-md relative overflow-hidden group">
                <span className="relative z-10">BLOG</span>
                <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-muted/50 rounded-md relative overflow-hidden group">
                <span className="relative z-10">CONTACT</span>
                <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            </div>
          </nav>

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-4">
            {/* User Menu for Desktop - Hidden for now */}
            {/* {user ? (
              <div className="hidden sm:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="hidden md:inline">
                        {userProfile?.full_name || user.email?.split('@')[0] || 'User'}
                      </span>
                      {userProfile?.role === 'admin' && (
                        <Shield className="w-4 h-4 text-primary" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <div className="flex flex-col">
                        <span className="font-medium">{userProfile?.full_name || 'User'}</span>
                        <span className="text-sm text-muted-foreground">{user.email}</span>
                        {userProfile?.role === 'admin' && (
                          <span className="text-xs text-primary font-medium">Administrator</span>
                        )}
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {userProfile?.role === 'admin' && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="flex items-center w-full">
                            <Shield className="w-4 h-4 mr-2" />
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link to="/auth" className="hidden sm:block">
                <Button variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )} */}

            {/* Desktop Donate Button */}
            <Link to="/donation" className="hidden sm:block">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 lg:px-6 text-sm relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25">
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  DONATE NOW
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <div className="flex items-center justify-between mb-6">
                    <img 
                      src="/genius-recovery-uploads/503e117d-b085-47e8-916d-ecb3995e75e9.png" 
                      alt="Genius Recovery" 
                      className="w-[200px] h-auto"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <Link 
                      to="/about" 
                      className="text-lg font-medium text-foreground hover:text-primary px-4 py-3 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      ABOUT
                    </Link>
                    <Link 
                      to="/emergency" 
                      className="text-lg font-semibold text-foreground hover:text-red-600 px-4 py-3 rounded-md hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-red-500/25 relative overflow-hidden group"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="relative z-10">EMERGENCY</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </Link>
                    <Link 
                      to="/resources" 
                      className="text-lg font-medium text-foreground hover:text-primary px-4 py-3 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      RESOURCES
                    </Link>
                    <Link 
                      to="/blog" 
                      className="text-lg font-medium text-foreground hover:text-primary px-4 py-3 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      BLOG
                    </Link>
                    <Link 
                      to="/contact" 
                      className="text-lg font-medium text-foreground hover:text-primary px-4 py-3 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      CONTACT
                    </Link>
                    
                    {/* Mobile Auth Section - Hidden for now */}
                    {/* {user ? (
                      <div className="border-t pt-4 mt-4">
                        <div className="flex flex-col gap-3">
                          <div className="px-4 py-3 bg-muted rounded-md">
                            <div className="font-medium">{userProfile?.full_name || 'User'}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                            {userProfile?.role === 'admin' && (
                              <div className="text-xs text-primary font-medium flex items-center gap-1 mt-1">
                                <Shield className="w-3 h-3" />
                                Administrator
                              </div>
                            )}
                          </div>
                          {userProfile?.role === 'admin' && (
                            <Link to="/admin" onClick={() => setIsOpen(false)}>
                              <Button variant="outline" className="w-full justify-start mt-2">
                                <Shield className="w-4 h-4 mr-2" />
                                Admin Dashboard
                              </Button>
                            </Link>
                          )}
                          <Button 
                            variant="outline" 
                            onClick={handleSignOut}
                            className="w-full justify-start mt-2"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-t pt-4 mt-4">
                        <Link to="/auth" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full justify-start">
                            <User className="w-4 h-4 mr-2" />
                            Sign In
                          </Button>
                        </Link>
                      </div>
                    )} */}

                    {/* Mobile Donate Button */}
                    <Link to="/donation" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-lg mt-6">
                        DONATE NOW
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;