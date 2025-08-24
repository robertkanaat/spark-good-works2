import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, User, LogOut, Settings, Shield, Phone, Heart, BookOpen, Users, Stethoscope, GraduationCap, Mail, HelpCircle, Briefcase, DollarSign, Gift, Handshake } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const location = useLocation();

  // Helper function to check if a route is active
  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

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
            <NavigationMenu className="z-50">
              <NavigationMenuList className="space-x-2">
                {/* About Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    onClick={() => window.location.href = '/about'}
                    className={`text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${
                      isActiveRoute('/about') || isActiveRoute('/press') || isActiveRoute('/open-letter') ? 'text-primary bg-primary/5' : 'text-muted-foreground'
                    }`}
                  >
                    ABOUT
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-50">
                    <div className="grid gap-3 p-6 w-[400px]">
                      <div className="row-span-3">
                        <Link
                          to="/about"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:shadow-lg transition-all duration-300 group"
                        >
                          <Users className="h-6 w-6 text-primary mb-2 transition-transform duration-300 group-hover:scale-110" />
                          <div className="mb-2 mt-4 text-lg font-medium">Our Story</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Learn about our mission to transform addiction recovery through innovation and compassion.
                          </p>
                        </Link>
                      </div>
                      <Link
                        to="/open-letter"
                        className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground group ${
                          isActiveRoute('/open-letter')
                            ? 'bg-accent text-accent-foreground' 
                            : 'hover:bg-accent hover:text-accent-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${
                            isActiveRoute('/open-letter') ? 'text-primary' : 'text-primary'
                          }`} />
                          <div className="text-sm font-medium leading-none">Open Letter</div>
                        </div>
                        <p className={`line-clamp-2 text-sm leading-snug ${
                          isActiveRoute('/open-letter') ? 'text-accent-foreground/80' : 'text-muted-foreground'
                        }`}>
                          Our public statement on addiction recovery reform
                        </p>
                      </Link>
                      <Link
                        to="/press"
                        className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground group ${
                          isActiveRoute('/press') 
                            ? 'bg-accent text-accent-foreground' 
                            : 'hover:bg-accent hover:text-accent-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Mail className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${
                            isActiveRoute('/press') ? 'text-primary' : 'text-primary'
                          }`} />
                          <div className={`text-sm font-medium leading-none ${
                            isActiveRoute('/press') ? 'text-accent-foreground' : ''
                          }`}>Press & Media</div>
                        </div>
                        <p className={`line-clamp-2 text-sm leading-snug ${
                          isActiveRoute('/press') ? 'text-accent-foreground/80' : 'text-muted-foreground'
                        }`}>
                          Media resources, press releases, and news coverage
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Emergency Button */}
                <NavigationMenuItem>
                  <Link 
                    to="/emergency"
                    className={`inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/25 ${
                      isActiveRoute('/emergency')
                        ? 'text-red-600 bg-red-50 dark:bg-red-950/20 scale-110 shadow-lg shadow-red-500/25'
                        : 'text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20'
                    }`}
                  >
                    EMERGENCY
                  </Link>
                </NavigationMenuItem>

                {/* Support Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isActiveRoute('/emergency') || isActiveRoute('/treatment-centers') || isActiveRoute('/support-groups') || 
                    isActiveRoute('/family-support') || isActiveRoute('/volunteer') || isActiveRoute('/donation') || isActiveRoute('/donors')
                      ? 'text-primary bg-primary/5' 
                      : 'text-muted-foreground'
                  }`}>
                    SUPPORT
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-50">
                    <div className="grid gap-3 p-6 w-[550px] grid-cols-2">
                      <Link
                        to="/donation"
                        className="block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                      >
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                          <div className="text-sm font-medium leading-none">Donate</div>
                        </div>
                        <p className="text-sm leading-snug text-muted-foreground">
                          Support our mission with a financial contribution
                        </p>
                      </Link>
                      <Link
                        to="/treatment-centers"
                        className="block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                      >
                        <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                          <div className="text-sm font-medium leading-none">Treatment Centers</div>
                        </div>
                        <p className="text-sm leading-snug text-muted-foreground">
                          Find verified addiction treatment facilities near you
                        </p>
                      </Link>
                      <Link
                        to="/support-groups"
                        className="block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                      >
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                          <div className="text-sm font-medium leading-none">Support Groups</div>
                        </div>
                        <p className="text-sm leading-snug text-muted-foreground">
                          Connect with peer recovery support communities
                        </p>
                      </Link>
                      <Link
                        to="/family-support"
                        className="block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                      >
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                          <div className="text-sm font-medium leading-none">Family Support</div>
                        </div>
                        <p className="text-sm leading-snug text-muted-foreground">
                          Resources and support for families affected by addiction
                        </p>
                      </Link>
                      <Link
                        to="/volunteer"
                        className="block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                      >
                        <div className="flex items-center gap-2">
                          <Handshake className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                          <div className="text-sm font-medium leading-none">Volunteer</div>
                        </div>
                        <p className="text-sm leading-snug text-muted-foreground">
                          Join our mission to transform lives and make a difference
                        </p>
                      </Link>
                      <Link
                        to="/donors"
                        className="block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                      >
                        <div className="flex items-center gap-2">
                          <Gift className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                          <div className="text-sm font-medium leading-none">Donors</div>
                        </div>
                        <p className="text-sm leading-snug text-muted-foreground">
                          Support through time, talent, or treasure - every contribution matters
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    onClick={() => window.location.href = '/resources'}
                    className={`text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${
                      isActiveRoute('/resources') || isActiveRoute('/education') || isActiveRoute('/recovery-tools') || isActiveRoute('/faq')
                        ? 'text-primary bg-primary/5' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    RESOURCES
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-50">
                    <div className="grid gap-3 p-6 w-[450px]">
                      <div className="row-span-3">
                        <Link
                          to="/resources"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:shadow-lg transition-all duration-300 group"
                        >
                          <BookOpen className="h-6 w-6 text-primary mb-2 transition-transform duration-300 group-hover:scale-110" />
                          <div className="mb-2 mt-4 text-lg font-medium">Recovery Resources</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Comprehensive tools, guides, and information to support your recovery journey.
                          </p>
                        </Link>
                      </div>
                      <Link
                        to="/education"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                      >
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                          <div className="text-sm font-medium leading-none">Education</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Learn about addiction, treatment options, and recovery strategies
                        </p>
                      </Link>
                      <Link
                        to="/recovery-tools"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                      >
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                          <div className="text-sm font-medium leading-none">Recovery Tools</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Practical tools and worksheets for your recovery toolkit
                        </p>
                      </Link>
                      <Link
                        to="/faq"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                      >
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                          <div className="text-sm font-medium leading-none">FAQ</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Frequently asked questions about addiction and recovery
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Blog Link */}
                <NavigationMenuItem>
                  <Link 
                    to="/blog"
                    className={`inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-muted/50 ${
                      isActiveRoute('/blog') 
                        ? 'text-primary bg-primary/5 scale-105' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    BLOG
                  </Link>
                </NavigationMenuItem>

                {/* Contact Link */}
                <NavigationMenuItem>
                  <Link 
                    to="/contact"
                    className={`inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-muted/50 ${
                      isActiveRoute('/contact') 
                        ? 'text-primary bg-primary/5 scale-105' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    CONTACT
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
              <Button className="bg-primary hover:bg-purple-600 text-primary-foreground font-semibold px-4 lg:px-6 text-sm relative overflow-hidden group transition-all duration-300 hover:scale-105">
                <Heart className="w-4 h-4 mr-2 relative z-10 transition-all duration-300 group-hover:animate-heartbeat" />
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  DONATE NOW
                </span>
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
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
                       className={`text-lg font-medium px-4 py-3 rounded-md transition-colors ${
                         isActiveRoute('/about')
                           ? 'text-primary bg-primary/10'
                           : 'text-foreground hover:text-primary hover:bg-muted'
                       }`}
                       onClick={() => setIsOpen(false)}
                     >
                       ABOUT
                     </Link>
                     <Link 
                       to="/emergency" 
                       className={`text-lg font-semibold px-4 py-3 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-red-500/25 relative overflow-hidden group ${
                         isActiveRoute('/emergency')
                           ? 'text-red-600 bg-red-50 dark:bg-red-950/20 scale-105 shadow-md shadow-red-500/25'
                           : 'text-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20'
                       }`}
                       onClick={() => setIsOpen(false)}
                     >
                       <span className="relative z-10">EMERGENCY</span>
                       <div className={`absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 transition-transform duration-300 origin-left ${
                         isActiveRoute('/emergency') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                       }`}></div>
                     </Link>
                     <Link 
                       to="/resources" 
                       className={`text-lg font-medium px-4 py-3 rounded-md transition-colors ${
                         isActiveRoute('/resources')
                           ? 'text-primary bg-primary/10'
                           : 'text-foreground hover:text-primary hover:bg-muted'
                       }`}
                       onClick={() => setIsOpen(false)}
                     >
                       RESOURCES
                     </Link>
                     <Link 
                       to="/blog" 
                       className={`text-lg font-medium px-4 py-3 rounded-md transition-colors ${
                         isActiveRoute('/blog')
                           ? 'text-primary bg-primary/10'
                           : 'text-foreground hover:text-primary hover:bg-muted'
                       }`}
                       onClick={() => setIsOpen(false)}
                     >
                       BLOG
                     </Link>
                     <Link 
                       to="/contact" 
                       className={`text-lg font-medium px-4 py-3 rounded-md transition-colors ${
                         isActiveRoute('/contact')
                           ? 'text-primary bg-primary/10'
                           : 'text-foreground hover:text-primary hover:bg-muted'
                       }`}
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
                      <Button className="w-full bg-primary hover:bg-purple-600 text-primary-foreground font-semibold py-3 text-lg mt-6 group transition-all duration-300 relative overflow-hidden">
                        <Heart className="w-5 h-5 mr-2 transition-all duration-300 group-hover:animate-heartbeat relative z-10" />
                        <span className="transition-transform duration-300 group-hover:scale-105 relative z-10">DONATE NOW</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
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