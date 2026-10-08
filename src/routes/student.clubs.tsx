import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { MyClubsPanel, BrowseClubsPanel } from '@/components/dash-sections';
import { pageHead } from '@/data/hub';
export const Route = createFileRoute('/student/clubs')({ head: () => pageHead('My Clubs', 'Clubs you are a member of at MIT ADT University.'), component: Page });
function Page() {
 return <DashboardLayout role="student" kicker="Student" title="My Clubs" subtitle="Clubs you are part of."><MyClubsPanel />< /> <BrowseClubsPanel /></DashboardLayout>;
}
