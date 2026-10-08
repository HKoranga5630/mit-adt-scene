import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { EventManagementPanel } from '@/components/dash-sections';
import { pageHead } from '@/data/hub';
export const Route = createFileRoute('/admin/events')({ head: () => pageHead('Event Management', 'Manage events across the university.'), component: Page });
function Page() {
 return <DashboardLayout role="admin" kicker="Admin" title="Event Management" subtitle="All campus events."><EventManagementPanel /></DashboardLayout>;
}
