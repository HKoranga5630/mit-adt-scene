import { Link, useRouterState } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { LayoutDashboard, CalendarDays, Users, Bell, LogOut, Compass, PlusCircle, ClipboardList, Megaphone, ShieldCheck, BarChart3, UserCog, Building2 } from 'lucide-react';

type Role = 'student' | 'club' | 'admin';
const navs = {
 student: { label: 'Student', items: [
  { to: '/student', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/events', label: 'Upcoming Events', icon: CalendarDays },
  { to: '/clubs', label: 'Browse Clubs', icon: Compass },
  { to: '/student/events', label: 'My Events', icon: ClipboardList },
  { to: '/student/clubs', label: 'My Clubs', icon: Users },
  { to: '/student/notifications', label: 'Notifications', icon: Bell },
 ] },
 club: { label: 'Club Representative', items: [
  { to: '/club', label: 'Club Dashboard', icon: LayoutDashboard },
  { to: '/club/create-event', label: 'Create Event', icon: PlusCircle },
  { to: '/club/events', label: 'Manage Events', icon: CalendarDays },
  { to: '/club/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/club/registrations', label: 'Registrations', icon: ClipboardList },
 ] },
 admin: { label: 'Administrator', items: [
  { to: '/admin', label: 'Admin Dashboard', icon: LayoutDashboard },
  { to: '/admin/approvals', label: 'Club Approvals', icon: ShieldCheck },
  { to: '/admin/users', label: 'User Management', icon: UserCog },
  { to: '/admin/clubs', label: 'Club Management', icon: Building2 },
  { to: '/admin/events', label: 'Event Management', icon: CalendarDays },
  { to: '/admin/reports', label: 'Participation Reports', icon: BarChart3 },
 ] },
} as const;

export function DashboardLayout({ role, kicker, title, subtitle, children }: { role: Role; kicker?: string; title: string; subtitle?: string; children: ReactNode }) {
 const pathname = useRouterState({ select: s => s.location.pathname }).replace(/\/$/, '') || '/';
 const nav = navs[role];
 return <div className="site-container dash-wrap">
  <aside className="dash-side"><div className="dash-side-title">{nav.label}</div><nav aria-label={`${nav.label} navigation`}>
   {nav.items.map(i => { const Icon = i.icon; return <Link key={i.to} to={i.to} className={`dash-link ${pathname === i.to ? 'active' : ''}`}><Icon />{i.label}</Link>; })}
   <Link to="/login" className="dash-link"><LogOut />Logout</Link>
  </nav></aside>
  <main className="min-w-0">
   <div className="dash-head">{kicker && <p className="section-kicker">{kicker}</p>}<h1 className="dash-title">{title}</h1>{subtitle && <p className="section-subtitle">{subtitle}</p>}</div>
   <p className="dash-note">Preview mode: sample data is shown and actions will work once accounts are connected.</p>
   {children}
  </main>
 </div>;
}
export function Panel({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
 return <section className="dash-panel"><div className="dash-panel-head"><h2 className="dash-panel-title">{title}</h2>{action}</div>{children}</section>;
}
export function StatGrid({ stats }: { stats: { label: string; value: string | number }[] }) {
 return <div className="dash-stats">{stats.map(s => <div key={s.label} className="dash-stat"><div className="text-xs text-muted-foreground">{s.label}</div><div className="dash-stat-value">{s.value}</div></div>)}</div>;
}
