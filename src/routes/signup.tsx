import { createFileRoute } from '@tanstack/react-router';
import { AuthScreen } from '@/components/auth-screen';
import { pageHead } from '@/data/hub';
export const Route=createFileRoute('/signup')({head:()=>pageHead('Sign Up','Join the MIT ADT University Club & Event Hub campus community as a student or club representative.'),component:()=> <AuthScreen signup/>});
