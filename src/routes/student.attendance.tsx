import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { AttendancePanel } from '@/components/campus-records';
import { pageHead } from '@/data/hub';
export const Route=createFileRoute('/student/attendance')({head:()=>pageHead('Student Attendance','Attendance for the student section of the MIT ADT University Club & Event Hub.'),component:Page});
function Page() {return <DashboardLayout role="student" title="Attendance"><AttendancePanel student/></DashboardLayout>;}
