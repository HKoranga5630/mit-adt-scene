import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { AttendancePanel } from '@/components/campus-records';
import { pageHead } from '@/data/hub';
export const Route=createFileRoute('/club/attendance')({head:()=>pageHead('Club Attendance','Attendance for the club section of the MIT ADT University Club & Event Hub.'),component:Page});
function Page() {return <DashboardLayout role="club" title="Attendance"><AttendancePanel/></DashboardLayout>;}
