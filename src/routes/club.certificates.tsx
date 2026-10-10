import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { CertificatesPanel } from '@/components/campus-records';
import { pageHead } from '@/data/hub';
export const Route=createFileRoute('/club/certificates')({head:()=>pageHead('Club Digital Certificates','Digital Certificates for the club section of the MIT ADT University Club & Event Hub.'),component:Page});
function Page() {return <DashboardLayout role="club" title="Digital Certificates"><CertificatesPanel/></DashboardLayout>;}
