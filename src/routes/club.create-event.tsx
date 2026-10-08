import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { CreateEventForm } from '@/components/dash-sections';
import { pageHead } from '@/data/hub';
export const Route = createFileRoute('/club/create-event')({ head: () => pageHead('Create Event', 'Create a new club event.'), component: Page });
function Page() {
 return <DashboardLayout role="club" kicker="Club Dashboard" title="Create Event" subtitle="Share a new event with students."><CreateEventForm /></DashboardLayout>;
}
