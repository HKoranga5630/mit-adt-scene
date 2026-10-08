import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { ClubManagementPanel } from '@/components/dash-sections';
import { pageHead } from '@/data/hub';
export const Route = createFileRoute('/admin/clubs')({ head: () => pageHead('Club Management', 'Manage clubs across the university.'), component: Page });
function Page() {
 return <DashboardLayout role="admin" kicker="Admin" title="Club Management" subtitle="All registered clubs."><ClubManagementPanel /></DashboardLayout>;
}
