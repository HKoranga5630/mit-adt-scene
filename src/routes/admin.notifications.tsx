import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { NotificationsPanel } from '@/components/dash-sections';
import { pageHead } from '@/data/hub';
export const Route=createFileRoute('/admin/notifications')({head:()=>pageHead('Admin Notifications','Notifications for the admin section of the MIT ADT University Club & Event Hub.'),component:Page});
function Page() {return <DashboardLayout role="admin" title="Notifications"><NotificationsPanel/></DashboardLayout>;}
