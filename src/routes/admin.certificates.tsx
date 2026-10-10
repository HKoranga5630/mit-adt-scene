import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard-shell';
import { CertificatesPanel } from '@/components/campus-records';
import { pageHead } from '@/data/hub';
export const Route=createFileRoute('/admin/certificates')({head:()=>pageHead('Admin Digital Certificates','Digital Certificates for the admin section of the MIT ADT University Club & Event Hub.'),component:Page});
function Page() {return <DashboardLayout role="admin" title="Digital Certificates"><CertificatesPanel/></DashboardLayout>;}
