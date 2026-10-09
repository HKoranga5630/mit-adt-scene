import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout, StatGrid } from '@/components/dashboard-shell';
import { ClubProfilePanel, ManageEventsPanel, AnnouncementsPanel, RegistrationsPanel } from '@/components/dash-sections';
import { pageHead, events, registrations, clubById } from '@/data/hub';
const repClub = clubById('aces')!;
export const Route = createFileRoute('/club/')({ head: () => pageHead('Club Dashboard', 'Manage your club profile, events, announcements, and registrations.'), component: Page });
function Page() {
 return <DashboardLayout role="club" kicker="Club Dashboard" title={repClub.name} subtitle="Manage your club, events, and members."><StatGrid stats={[{label:"Total Events",value:events.filter(e=>e.club===repClub.name).length},{label:"Total Registrations",value:registrations.length},{label:"Members",value:repClub.members},{label:"Announcements",value:2}]} /><ClubProfilePanel /><ManageEventsPanel /><AnnouncementsPanel /><RegistrationsPanel /></DashboardLayout>;
}
