import { createFileRoute } from '@tanstack/react-router';
import { StudentLoginScreen } from '@/components/auth-screen';
import { pageHead } from '@/data/hub';
export const Route=createFileRoute('/student-login')({head:()=>pageHead('Student Login','MIT ADT University students log in to the Club & Event Hub with their enrollment number and password.'),component:()=> <StudentLoginScreen/>});
