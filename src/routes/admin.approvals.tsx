import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { PendingApprovalsPanel } from '@/components/dash-sections';
import { pageHead } from '@/data/hub';
export const Route = createFileRoute('/admin/approvals')({ head: () => pageHead('Club Approvals', 'Review pending club registration requests.'), component: Page });
function Page() {
 return <DashboardLayout role="admin" kicker="Admin" title="Pending Club Approvals" subtitle="Approve or reject new club requests."><PendingApprovalsPanel /></DashboardLayout>;
}
