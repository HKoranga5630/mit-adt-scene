import { createFileRoute } from '@tanstack/react-router';
import { AuthScreen } from '@/components/auth-screen';
import { pageHead } from '@/data/hub';
export const Route=createFileRoute('/login')({head:()=>pageHead('Log In','MIT ADT University Club & Event Hub student and club representative sign-in page.'),component:()=> <AuthScreen/>});
