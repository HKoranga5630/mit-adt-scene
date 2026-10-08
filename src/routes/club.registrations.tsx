import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { RegistrationsPanel } from '@/components/dash-sections';
import { pageHead } from '@/data/hub';
export const Route = createFileRoute('/club/registrations')({ head: () => pageHead('Registrations', 'Student registrations for your club events.'), component: Page });
function Page() {
 return <DashboardLayout role="club" kicker="Club Dashboard" title="Registrations" subtitle="Students registered for your events."><RegistrationsPanel /></DashboardLayout>;
}
