import { createFileRoute } from '@tanstack/react-router';
import { AuthScreen } from '@/components/auth-screen';
import { pageHead } from '@/data/hub';
export const Route=createFileRoute('/admin-login')({head:()=>pageHead('Admin Login','Administrator sign-in for the MIT ADT University Club & Event Hub.'),component:()=> <AuthScreen initialRole="admin"/>});
