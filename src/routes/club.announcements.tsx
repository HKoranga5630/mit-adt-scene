import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { AnnouncementsPanel } from '@/components/dash-sections';
import { pageHead } from '@/data/hub';
export const Route = createFileRoute('/club/announcements')({ head: () => pageHead('Announcements', 'Club announcements for members.'), component: Page });
function Page() {
 return <DashboardLayout role="club" kicker="Club Dashboard" title="Announcements" subtitle="Keep your members informed."><AnnouncementsPanel /></DashboardLayout>;
}
