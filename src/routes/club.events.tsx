import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { ManageEventsPanel } from '@/components/dash-sections';
import { pageHead } from '@/data/hub';
export const Route = createFileRoute('/club/events')({ head: () => pageHead('Manage Events', 'Edit, delete, and review your club events.'), component: Page });
function Page() {
 return <DashboardLayout role="club" kicker="Club Dashboard" title="Manage Events" subtitle="Create, edit, and review your events."><ManageEventsPanel /></DashboardLayout>;
}
