import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { AttendancePanel } from '@/components/campus-records';
import { pageHead } from '@/data/hub';
export const Route=createFileRoute('/admin/attendance')({head:()=>pageHead('Admin Attendance','Attendance for the admin section of the MIT ADT University Club & Event Hub.'),component:Page});
function Page() {return <DashboardLayout role="admin" title="Attendance"><AttendancePanel/></DashboardLayout>;}
