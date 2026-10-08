import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { UserManagementPanel } from '@/components/dash-sections';
import { pageHead } from '@/data/hub';
export const Route = createFileRoute('/admin/users')({ head: () => pageHead('User Management', 'Manage student and representative accounts.'), component: Page });
function Page() {
 return <DashboardLayout role="admin" kicker="Admin" title="User Management" subtitle="Students and club representatives."><UserManagementPanel /></DashboardLayout>;
}
