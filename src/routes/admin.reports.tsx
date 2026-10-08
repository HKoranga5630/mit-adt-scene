import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { ParticipationReportsPanel } from '@/components/dash-sections';
import { pageHead } from '@/data/hub';
export const Route = createFileRoute('/admin/reports')({ head: () => pageHead('Participation Reports', 'Event participation across the university.'), component: Page });
function Page() {
 return <DashboardLayout role="admin" kicker="Admin" title="Participation Reports" subtitle="Registrations against capacity."><ParticipationReportsPanel /></DashboardLayout>;
}
