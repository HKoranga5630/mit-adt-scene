import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { MyEventsPanel, UpcomingEventsPanel } from '@/components/dash-sections';
import { pageHead } from '@/data/hub';
export const Route = createFileRoute('/student/events')({ head: () => pageHead('My Events', 'Events you have registered for at MIT ADT University.'), component: Page });
function Page() {
 return <DashboardLayout role="student" kicker="Student" title="My Events" subtitle="Events you have registered for."><MyEventsPanel /><UpcomingEventsPanel /></DashboardLayout>;
}
