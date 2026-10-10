import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { CertificatesPanel } from '@/components/campus-records';
import { pageHead } from '@/data/hub';
export const Route=createFileRoute('/student/certificates')({head:()=>pageHead('Student Digital Certificates','Digital Certificates for the student section of the MIT ADT University Club & Event Hub.'),component:Page});
function Page() {return <DashboardLayout role="student" title="Digital Certificates"><CertificatesPanel student/></DashboardLayout>;}
