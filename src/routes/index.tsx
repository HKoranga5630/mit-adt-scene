import { createFileRoute } from '@tanstack/react-router';
import { AuthScreen } from '@/components/auth-screen';
import { pageHead } from '@/data/hub';
export const Route=createFileRoute('/')({head:()=>pageHead('Welcome · Select Role','Select Admin, Club, or Student to sign in to the MIT ADT University College Club Management & Event Hub.'),component:()=> <AuthScreen/>});
