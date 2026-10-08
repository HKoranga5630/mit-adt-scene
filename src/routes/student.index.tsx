import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { UpcomingEventsPanel, MyEventsPanel, MyClubsPanel, BrowseClubsPanel, NotificationsPanel } from '@/components/dash-sections';
import { pageHead } from '@/data/hub';
export const Route = createFileRoute('/student/')({ head: () => pageHead('Student Dashboard', 'Your personal hub for campus events, clubs, and notifications.'), component: Page });
function Page() {
 return <DashboardLayout role="student" kicker="Student Dashboard" title="Welcome back, Student!" subtitle="Discover what is happening across MIT ADT University this week."><UpcomingEventsPanel />< /> <MyEventsPanel />< /> <MyClubsPanel />< /> <BrowseClubsPanel />< /> <NotificationsPanel limit={3} /></DashboardLayout>;
}
