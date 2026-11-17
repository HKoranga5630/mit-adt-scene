import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout, StatGrid } from '@/components/dashboard-shell';
import { UpcomingEventsPanel, MyEventsPanel, MyClubsPanel, BrowseClubsPanel, NotificationsPanel } from '@/components/dash-sections';
import { pageHead } from '@/data/hub';
import { useDemo } from '@/data/demo-store';
export const Route = createFileRoute('/student/')({ head: () => pageHead('Student Dashboard', 'Your personal hub for campus events, clubs, and notifications.'), component: Page });
function Page() {
 const { joined, registered } = useDemo();
 return <DashboardLayout role="student" kicker="Student Dashboard" title="Welcome back, Student!" subtitle="Discover what is happening across MIT ADT University this week."><StatGrid stats={[{ label: 'Clubs joined', value: joined.length }, { label: 'Events registered', value: registered.length }]} /><UpcomingEventsPanel /><MyEventsPanel /><MyClubsPanel /><BrowseClubsPanel /><NotificationsPanel limit={3} /></DashboardLayout>;
}
