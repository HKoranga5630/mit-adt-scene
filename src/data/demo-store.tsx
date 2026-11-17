import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import { clubs as initialClubs, events as initialEvents, notifications as initialNotifications, announcements as initialAnnouncements, hubUsers as initialUsers, sampleStudent, type Club, type CollegeEvent } from './hub';
type DemoNotification = (typeof initialNotifications)[number] & {read:boolean};
export interface SampleCertificate {id:string;participant:string;event:string;issued:string}
export const sampleCertificates:SampleCertificate[]=[{id:'sample-1',participant:'Aarav Sharma',event:'TechFest 2026',issued:'October 25, 2026'},{id:'sample-2',participant:'Diya Patil',event:'Rhythm Night',issued:'October 29, 2026'}];
export const demoAttendance:Record<string,string>={'tech-fest':'Present (demo)','rhythm-night':'Pending (demo)','art-workshop':'Not registered (demo)'};
function useDemoState(){
 const [clubs,setClubs]=useState<Club[]>(initialClubs);
 const [events,setEvents]=useState<CollegeEvent[]>(initialEvents);
 const [users,setUsers]=useState(initialUsers);
 const [notifications,setNotifications]=useState<DemoNotification[]>(initialNotifications.map((n,i)=>({...n,read:i===3})));
 const [announcements,setAnnouncements]=useState(initialAnnouncements);
 const [joined,setJoined]=useState(sampleStudent.joinedClubIds);
 const [registered,setRegistered]=useState(sampleStudent.registeredEventIds);
 const joinedRef=useRef(sampleStudent.joinedClubIds);
 const registeredRef=useRef(sampleStudent.registeredEventIds);
 const [approvals,setApprovals]=useState<Record<string,string>>({});
 const [attendance,setAttendance]=useState<Record<string,string>>({});
 const [certificates,setCertificates]=useState(sampleCertificates);
 const joinClub=(id:string)=>{
  if(joinedRef.current.includes(id))return false;
  joinedRef.current=[...joinedRef.current,id];
  setJoined(joinedRef.current);
  setClubs(current=>current.map(club=>club.id===id?{...club,members:club.members+1}:club));
  return true;
 };
 const registerEvent=(id:string)=>{
  if(registeredRef.current.includes(id))return false;
  registeredRef.current=[...registeredRef.current,id];
  setRegistered(registeredRef.current);
  return true;
 };
 return {clubs,setClubs,events,setEvents,users,setUsers,notifications,setNotifications,announcements,setAnnouncements,joined,setJoined,registered,setRegistered,joinClub,registerEvent,approvals,setApprovals,attendance,setAttendance,certificates,setCertificates};
}
const DemoContext=createContext<ReturnType<typeof useDemoState>|null>(null);
export function DemoProvider({children}:{children:ReactNode}){const state=useDemoState();return <DemoContext.Provider value={state}>{children}</DemoContext.Provider>;}
export function useDemo(){const demo=useContext(DemoContext);if(!demo)throw new Error('DemoProvider is required');return demo;}
