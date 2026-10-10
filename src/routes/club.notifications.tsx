import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { NotificationsPanel } from '@/components/dash-sections';
import { pageHead } from '@/data/hub';
export const Route=createFileRoute('/club/notifications')({head:()=>pageHead('Club Notifications','Notifications for the club section of the MIT ADT University Club & Event Hub.'),component:Page});
function Page() {return <DashboardLayout role="club" title="Notifications"><NotificationsPanel/></DashboardLayout>;}
