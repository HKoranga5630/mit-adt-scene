import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout, StatGrid } from '@/components/dashboard-shell';
import { PendingApprovalsPanel, ParticipationReportsPanel, UserManagementPanel, ClubManagementPanel, EventManagementPanel } from '@/components/dash-sections';
import { pageHead, admin.index.tsx1 } from '@/data/hub';
export const Route = createFileRoute('/admin/')({ head: () => pageHead('Admin Dashboard', 'Manage users, clubs, events, and participation across the hub.'), component: Page });
function Page() {
 return <DashboardLayout role="admin" kicker="Admin Dashboard" title="University Overview" subtitle="Manage the College Club Management & Event Hub."><StatGrid stats={[{label:"Total Students",value:adminStats.students.toLocaleString("en-IN")},{label:"Total Clubs",value:adminStats.clubs},{label:"Total Events",value:adminStats.events},{label:"Total Registrations",value:adminStats.registrations}]} /><PendingApprovalsPanel />< /> <ParticipationReportsPanel />< /> <UserManagementPanel />< /> <ClubManagementPanel />< /> <EventManagementPanel /></DashboardLayout>;
}
