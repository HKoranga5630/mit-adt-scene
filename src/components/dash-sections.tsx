import { Link } from '@tanstack/react-router';
import { Bell, CalendarDays, Eye, Pencil, Trash2, Check, X, Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Panel } from '@/components/dashboard-shell';
import { clubs, events, eventById, clubById, sampleStudent, notifications, announcements, registrations, pendingClubs, hubUsers, participation, type CollegeEvent } from '@/data/hub';

const myEvents = sampleStudent.registeredEventIds.map(eventById).filter(Boolean) as CollegeEvent[];
const myClubs = sampleStudent.joinedClubIds.map(clubById).filter(Boolean) as typeof clubs;
const repClub = clubs[0]!;
const repEvents = events.filter(e => e.club === repClub.name);

function EventRow({ e, children }: { e: CollegeEvent; children?: React.ReactNode }) {
 return <div className="dash-row"><img src={e.image} alt={e.name} width={72} height={48} className="h-12 w-[72px] rounded object-cover" /><div className="min-w-0 flex-1"><Link to="/events/$eventId" params={{ eventId: e.id }} className="font-semibold text-sm hover:text-primary">{e.name}</Link><p className="text-xs text-muted-foreground">{e.date} · {e.time.split(' – ')[0]} · {e.venue}</p></div>{children}</div>;
}

export function UpcomingEventsPanel() {
 return <Panel title="Upcoming Events" action={<Button asChild variant="link" size="sm"><Link to="/events">View all</Link></Button>}>{events.map(e => <EventRow key={e.id} e={e}><Button asChild size="sm" variant="outline"><Link to="/events/$eventId" params={{ eventId: e.id }}>View Details</Link></Button></EventRow>)}</Panel>;
}
export function BrowseClubsPanel() {
 return <Panel title="Browse Clubs" action={<Button asChild variant="link" size="sm"><Link to="/clubs">All clubs</Link></Button>}><div className="grid gap-3 sm:grid-cols-3">{clubs.slice(0, 6).map(c => <Link key={c.id} to="/clubs/$clubId" params={{ clubId: c.id }} className="rounded-md border border-border p-3 hover:border-primary"><p className="text-sm font-semibold">{c.name}</p><span className="category-badge mt-2" data-category={c.category}>{c.category}</span></Link>)}</div></Panel>;
}
export function MyEventsPanel() {
 return <Panel title="My Registered Events">{myEvents.map(e => <EventRow key={e.id} e={e}><span className="category-badge" data-category="Community">Registered</span></EventRow>)}</Panel>;
}
export function MyClubsPanel() {
 return <Panel title="My Clubs">{myClubs.map(c => <div key={c.id} className="dash-row"><div className="flex-1 min-w-0"><Link to="/clubs/$clubId" params={{ clubId: c.id }} className="font-semibold text-sm hover:text-primary">{c.name}</Link><p className="text-xs text-muted-foreground">{c.category} · {c.members} members</p></div><Button asChild size="sm" variant="outline"><Link to="/clubs/$clubId" params={{ clubId: c.id }}>View Club</Link></Button></div>)}</Panel>;
}
export function NotificationsPanel({ limit }: { limit?: number }) {
 return <Panel title="Notifications" action={limit ? <Button asChild variant="link" size="sm"><Link to="/student/notifications">View all</Link></Button> : undefined}>{notifications.slice(0, limit ?? notifications.length).map(n => <div key={n.id} className="dash-row items-start"><Bell size={16} className="mt-0.5 text-primary shrink-0" /><div className="flex-1 min-w-0"><p className="text-sm font-semibold">{n.title}</p><p className="text-xs text-muted-foreground mt-1">{n.body}</p></div><span className="text-xs text-muted-foreground">{n.time}</span></div>)}</Panel>;
}

export function ClubProfilePanel() {
 return <Panel title="Club Profile" action={<Button size="sm" variant="outline" disabled><Pencil size={14} />Edit Profile</Button>}><p className="font-semibold">{repClub.name}</p><span className="category-badge mt-2" data-category={repClub.category}>{repClub.category}</span><p className="text-sm text-muted-foreground mt-3 leading-7">{repClub.about}</p><p className="text-xs text-muted-foreground mt-2 flex items-center gap-2"><Users size={14} />{repClub.members} members</p></Panel>;
}
export function ManageEventsPanel() {
 return <Panel title="Manage Events" action={<Button asChild size="sm"><Link to="/club/create-event"><Plus size={14} />Create</Link></Button>}>{repEvents.map(e => <EventRow key={e.id} e={e}><div className="flex gap-2 flex-wrap"><Button size="sm" variant="outline" disabled><Pencil size={14} />Edit</Button><Button size="sm" variant="outline" disabled><Trash2 size={14} />Delete</Button><Button asChild size="sm" variant="outline"><Link to="/club/registrations"><Eye size={14} />View Registrations</Link></Button></div></EventRow>)}</Panel>;
}
export function AnnouncementsPanel() {
 return <Panel title="Announcements" action={<Button size="sm" variant="outline" disabled><Plus size={14} />New Announcement</Button>}>{announcements.map(a => <div key={a.id} className="dash-row items-start"><div className="flex-1"><p className="text-sm font-semibold">{a.title}</p><p className="text-xs text-muted-foreground mt-1">{a.body}</p></div><span className="text-xs text-muted-foreground">{a.date}</span></div>)}</Panel>;
}
export function RegistrationsPanel() {
 return <Panel title="Registrations"><div className="table-scroll"><table><thead><tr><th>Student</th><th>Email</th><th>Event</th><th>Registered on</th></tr></thead><tbody>{registrations.map(r => <tr key={r.id}><td>{r.student}</td><td>{r.email}</td><td>{r.event}</td><td>{r.registeredOn}</td></tr>)}</tbody></table></div></Panel>;
}
export function CreateEventForm() {
 const f = (id: string, label: string, type = 'text') => <div className="grid gap-2"><Label htmlFor={id}>{label}</Label><Input id={id} type={type} /></div>;
 return <Panel title="Create Event"><form className="grid gap-4" onSubmit={e => e.preventDefault()}>{f('ev-name', 'Event name')}<div className="grid gap-2"><Label htmlFor="ev-desc">Description</Label><Textarea id="ev-desc" rows={4} /></div><div className="grid gap-4 sm:grid-cols-2">{f('ev-date', 'Date', 'date')}{f('ev-time', 'Time', 'time')}</div>{f('ev-venue', 'Venue')}<div className="grid gap-4 sm:grid-cols-2">{f('ev-poster', 'Event poster', 'file')}{f('ev-deadline', 'Registration deadline', 'date')}</div><Button type="submit" disabled className="w-fit"><Plus size={14} />Create Event</Button><p className="text-xs text-muted-foreground">Publishing events will be available once accounts are connected.</p></form></Panel>;
}

export function PendingApprovalsPanel() {
 return <Panel title="Pending Club Approvals">{pendingClubs.map(p => <div key={p.id} className="dash-row"><div className="flex-1 min-w-0"><p className="text-sm font-semibold">{p.name}</p><p className="text-xs text-muted-foreground">{p.category} · Requested by {p.representative} · {p.submitted}</p></div><div className="flex gap-2"><Button size="sm" disabled><Check size={14} />Approve</Button><Button size="sm" variant="outline" disabled><X size={14} />Reject</Button></div></div>)}</Panel>;
}
export function UserManagementPanel() {
 return <Panel title="User Management"><div className="table-scroll"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead><tbody>{hubUsers.map(u => <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.status}</td><td><div className="flex gap-2"><Button size="sm" variant="outline" disabled><Pencil size={13} /></Button><Button size="sm" variant="outline" disabled><Trash2 size={13} /></Button></div></td></tr>)}</tbody></table></div></Panel>;
}
export function ClubManagementPanel() {
 return <Panel title="Club Management"><div className="table-scroll"><table><thead><tr><th>Club</th><th>Category</th><th>Members</th><th>Actions</th></tr></thead><tbody>{clubs.map(c => <tr key={c.id}><td><Link to="/clubs/$clubId" params={{ clubId: c.id }} className="hover:text-primary">{c.name}</Link></td><td>{c.category}</td><td>{c.members}</td><td><div className="flex gap-2"><Button size="sm" variant="outline" disabled><Pencil size={13} /></Button><Button size="sm" variant="outline" disabled><Trash2 size={13} /></Button></div></td></tr>)}</tbody></table></div></Panel>;
}
export function EventManagementPanel() {
 return <Panel title="Event Management">{events.map(e => <EventRow key={e.id} e={e}><div className="flex gap-2"><Button size="sm" variant="outline" disabled><Pencil size={14} />Edit</Button><Button size="sm" variant="outline" disabled><Trash2 size={14} />Delete</Button></div></EventRow>)}</Panel>;
}
export function ParticipationReportsPanel() {
 return <Panel title="Participation Reports">{participation.map(p => <div key={p.event} className="dash-row block"><div className="flex justify-between text-sm mb-2"><span className="font-semibold flex items-center gap-2"><CalendarDays size={14} />{p.event}</span><span className="text-muted-foreground">{p.registered} / {p.capacity}</span></div><Progress value={(p.registered / p.capacity) * 100} /></div>)}</Panel>;
}
