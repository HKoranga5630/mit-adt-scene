import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { NotificationsPanel } from '@/components/dash-sections';
import { pageHead } from '@/data/hub';
export const Route = createFileRoute('/student/notifications')({ head: () => pageHead('Notifications', 'Updates about your events and clubs.'), component: Page });
function Page() {
 return <DashboardLayout role="student" kicker="Student" title="Notifications" subtitle="Latest updates from your clubs and events."><NotificationsPanel /></DashboardLayout>;
}
