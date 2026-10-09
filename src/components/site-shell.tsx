import { Link, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';
import { Menu, X, ArrowUpRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import officialLogo from '@/assets/mit-adt-official-logo.png.asset.json';

export function UniversityBrand() {
 return <div className="brand"><img className="brand-mark" src={officialLogo.url} alt="Official MIT ADT University logo" width={863} height={860}/><div className="min-w-0"><div className="brand-title">MIT ADT <span className="font-medium">University</span></div><div className="brand-subtitle">Art, Design & Technology University</div></div></div>;
}
export function SiteHeader() {
 const [open,setOpen]=useState(false);
 const pathname=useRouterState({select: s=>s.location.pathname});
 const links=[{to:'/' as const,label:'Home'},{to:'/clubs' as const,label:'Clubs'},{to:'/events' as const,label:'Events'}];
 const dash=[{to:'/student' as const,label:'Student'},{to:'/club' as const,label:'Club'},{to:'/admin' as const,label:'Admin'}];
 return <header className="site-header"><div className="site-container header-inner"><Link to="/" aria-label="MIT ADT University home" onClick={()=>setOpen(false)}><UniversityBrand/></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(l=><Link key={l.to} to={l.to} className={`nav-link ${pathname===l.to?'active':''}`}>{l.label}</Link>)}{dash.map(l=><Link key={l.to} to={l.to} className={`nav-link ${pathname.startsWith(l.to)?'active':''}`}>{l.label}</Link>)}</nav><div className="header-actions flex items-center gap-4"><Button asChild variant="ghost"><Link to="/login">Log In</Link></Button><Button asChild><Link to="/signup">Sign Up <ArrowUpRight size={15}/></Link></Button></div><Button className="mobile-toggle" size="icon" variant="ghost" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</Button></div>{open&&<nav className="mobile-menu" aria-label="Mobile navigation">{[...links,...dash.map(d=>({...d,label:d.label+' Dashboard'})),{to:'/login' as const,label:'Log In'},{to:'/signup' as const,label:'Sign Up'}].map(l=><Link key={l.to} to={l.to} className={pathname===l.to?'active':''} onClick={()=>setOpen(false)}>{l.label}</Link>)}</nav>}</header>;
}
export function SiteFooter() {
 return <footer className="site-footer"><div className="site-container"><div className="footer-grid"><div><Link to="/" aria-label="MIT ADT University home"><UniversityBrand/></Link><p className="footer-copy">College Club Management & Event Hub.<br/>One campus. Countless possibilities.<br/>Find your people. Make your mark.</p></div><div><h3 className="footer-title">Explore the hub</h3><div className="footer-links"><Link to="/">Home</Link><Link to="/clubs">Clubs</Link><Link to="/events">Events</Link><Link to="/student">Student Dashboard</Link><Link to="/club">Club Dashboard</Link><Link to="/admin">Admin Dashboard</Link></div></div><div><h3 className="footer-title">Your campus community</h3><div className="footer-links"><Link to="/login">Log In</Link><Link to="/signup">Sign Up</Link><span className="flex items-start gap-2"><MapPin size={14} className="shrink-0"/>MIT ADT University<br/>Pune, Maharashtra</span></div></div></div><div className="footer-bottom"><span>© 2026 MIT ADT University · College Club Management & Event Hub</span><span>Made for students. Inspired by community.</span></div></div></footer>;
}
