
import { Link, useRouterState, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Menu, X, ArrowUpRight, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/data/auth-context';
import mitAdtLogo from '@/assets/mit-adt-logo.png';

export function UniversityBrand() {
  return (
    <div className="brand">
      <img
        className="brand-mark"
        src={mitAdtLogo}
        alt="Official MIT ADT University logo"
        width={863}
        height={860}
      />
      <div className="min-w-0">
        <div className="brand-title">
          MIT ADT <span className="font-medium">University</span>
        </div>
        <div className="brand-subtitle">
          Art, Design & Technology University
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const authPage =
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/student-login') ||
    pathname.startsWith('/admin-login');

  const publicLinks = [
    { to: '/home' as const, label: 'Home' },
    { to: '/clubs' as const, label: 'Clubs' },
    { to: '/events' as const, label: 'Events' },
  ];

  const roleLinks = user
    ? user.role === 'student'
      ? [{ to: '/student' as const, label: 'Student Dashboard' }]
      : user.role === 'club'
        ? [{ to: '/club' as const, label: 'Club Dashboard' }]
        : [{ to: '/admin' as const, label: 'Admin Dashboard' }]
    : [];

  const navigationLinks = user
    ? [...publicLinks, ...roleLinks]
    : [];

  const handleLogout = async () => {
    logout();
    setOpen(false);
    await navigate({ to: '/login' });
  };

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link
          to={user ? '/home' : '/login'}
          aria-label="MIT ADT University"
          onClick={() => setOpen(false)}
        >
          <UniversityBrand />
        </Link>

        {!authPage && user && (
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${
                  pathname.startsWith(link.to) ? 'active' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="header-actions flex items-center gap-4">
          {!user ? (
            <>
              <Button asChild variant="ghost">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">
                  Sign Up <ArrowUpRight size={15} />
                </Link>
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>

        {!authPage && user && (
          <Button
            className="mobile-toggle"
            size="icon"
            variant="ghost"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        )}
      </div>

      {open && user && !authPage && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {navigationLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={pathname.startsWith(link.to) ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button onClick={handleLogout}>Logout</button>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { user } = useAuth();

  if (!user) return null;

  const dashboardLink =
    user.role === 'student'
      ? { to: '/student' as const, label: 'Student Dashboard' }
      : user.role === 'club'
        ? { to: '/club' as const, label: 'Club Dashboard' }
        : { to: '/admin' as const, label: 'Admin Dashboard' };

  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          <div>
            <Link to="/home" aria-label="MIT ADT University home">
              <UniversityBrand />
            </Link>
            <p className="footer-copy">
              College Club Management &amp; Event Hub.
              <br />
              One campus. Countless possibilities.
              <br />
              Find your people. Make your mark.
            </p>
          </div>

          <div>
            <h3 className="footer-title">Explore the hub</h3>
            <div className="footer-links">
              <Link to="/home">Home</Link>
              <Link to="/clubs">Clubs</Link>
              <Link to="/events">Events</Link>
              <Link to={dashboardLink.to}>{dashboardLink.label}</Link>
            </div>
          </div>

          <div>
            <h3 className="footer-title">Your campus community</h3>
            <div className="footer-links">
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
              <span className="flex items-start gap-2">
                <MapPin size={14} className="shrink-0" />
                MIT ADT University
                <br />
                Pune, Maharashtra
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 MIT ADT University · College Club Management &amp; Event Hub
          </span>
          <span>Made for students. Inspired by community.</span>
        </div>
      </div>
    </footer>
  );
}
