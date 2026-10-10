import groovanceLogo from '@/assets/groovance-logo.jpg.asset.json';
import ieeeLogo from '@/assets/ieee-logo.jpg.asset.json';
import ercLogo from '@/assets/erc-ms-logo.jpg.asset.json';
import robotics from '@/assets/robotics.jpg';
import music from '@/assets/music.jpg';
import arts from '@/assets/arts.jpg';
export type Category = 'Technology' | 'Cultural' | 'Arts & Design' | 'Community' | 'Sports';
export interface Club { id: string; name: string; category: Category; description: string; members: number; logo?: string; icon: 'code'|'music'|'palette'|'heart'|'camera'|'sport'; tone: string; about: string; }
export interface CollegeEvent { id: string; name: string; category: Category; date: string; day: string; month: string; time: string; venue: string; club: string; image: string; description: string; }
// Illustrative frontend content only. Replace through a real data service when integrated.
export const clubs: Club[]=[
 {id:'groovance',name:'Groovance',logo:groovanceLogo.url,category:'Cultural',description:'Dance, rhythm, and student performances.',members:0,icon:'music',tone:'coral',about:'Discover the Groovance campus dance community. Club details will be added when available.'},
 {id:'erc-ms',name:'ERC MS',logo:ercLogo.url,category:'Technology',description:'Connect with the ERC MS campus community.',members:0,icon:'code',tone:'teal',about:'Explore ERC MS at MIT ADT University. Club details will be added when available.'},
 {id:'aces',name:'ACES',category:'Technology',description:'Computer engineering and applied science in action. Build projects and grow with fellow tech enthusiasts.',members:128,icon:'code',tone:'blue',about:'A student community for curious builders. Explore computing, electronics, and emerging technology through collaborative projects, peer-led workshops, and friendly challenges.'},
 {id:'impact',name:'Impact',category:'Community',description:'Small actions, meaningful change. Volunteer, raise awareness, and give back together.',members:156,icon:'heart',tone:'teal',about:'Meet students passionate about making a positive difference. Collaborate on volunteering activities, awareness initiatives, and community-led projects across campus.'},
 {id:'ieee',name:'IEEE',logo:ieeeLogo.url,category:'Technology',description:'Technology, research, and professional growth. Learn from experts and build your network.',members:112,icon:'code',tone:'coral',about:'The campus professional technology community. Take part in technical talks, workshops, and competitions while connecting with industry and research practitioners.'},
 {id:'cyber-sakti',name:'Cyber Sakti',category:'Technology',description:'Security starts here. Practise ethical hacking and stay ahead of cyber threats.',members:84,icon:'code',tone:'gold',about:'A cybersecurity collective for students who love solving puzzles. Practise ethical hacking, capture-the-flag challenges, and secure-systems awareness together.'},
 {id:'cloud-aws',name:'Cloud Computing AWS',category:'Technology',description:'Deploy, scale, and build on the cloud with guided AWS labs and real projects.',members:96,icon:'code',tone:'blue',about:'A hands-on cloud community. Explore AWS services, hosting, and deployment through guided labs, certification study groups, and team projects.'},
];
export const events: CollegeEvent[]=[
 {id:'tech-fest',name:'TechFest 2026',category:'Technology',date:'October 24, 2026',day:'24',month:'OCT',time:'10:00 AM – 5:00 PM',venue:'School of Engineering Auditorium',club:'IEEE',image:robotics,description:'A day of ideas, innovation, and hands-on discovery. Explore student robotics projects, join technical workshops, and meet the campus community of makers.'},
 {id:'rhythm-night',name:'Rhythm Night',category:'Cultural',date:'October 28, 2026',day:'28',month:'OCT',time:'6:00 PM – 9:00 PM',venue:'Open Air Amphitheatre',club:'Impact',image:music,description:'An evening of live music and campus talent. Enjoy student bands, acoustic sets, and performances that bring the university community together.'},
 {id:'art-workshop',name:'Artistry: Creative Workshop',category:'Arts & Design',date:'November 2, 2026',day:'02',month:'NOV',time:'11:00 AM – 2:00 PM',venue:'School of Fine Arts Studio',club:'ACES',image:arts,description:'Take a creative break and discover your artistic side. Experiment with colors and techniques in a welcoming workshop for beginners and experienced artists alike.'},
];
export function pageHead(title: string, description: string) {return {meta:[{title:`${title} | MIT ADT University Club & Event Hub`},{name:'description',content:description},{property:'og:title',content:`${title} | MIT ADT University Club & Event Hub`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]};}

// ---- Sample dashboard content (illustrative only; replace with a real data service later) ----
export const clubById=(id:string)=>clubs.find(c=>c.id===id);
export const eventById=(id:string)=>events.find(e=>e.id===id);
export const clubByName=(name:string)=>clubs.find(c=>c.name===name);
export const sampleStudent={registeredEventIds:['tech-fest','rhythm-night'],joinedClubIds:['aces','ieee','cloud-aws']};
export interface HubNotification{id:string;title:string;body:string;time:string;kind:'event'|'club'|'system'}
export const notifications:HubNotification[]=[
 {id:'n1',title:'TechFest 2026 venue confirmed',body:'TechFest 2026 will be held at the School of Engineering Auditorium.',time:'2 hours ago',kind:'event'},
 {id:'n2',title:'New announcement from Impact',body:'Auditions for the campus band open next week.',time:'Yesterday',kind:'club'},
 {id:'n3',title:'Registration closing soon',body:'Registration for Artistry: Creative Workshop closes on October 30.',time:'2 days ago',kind:'event'},
 {id:'n4',title:'Welcome to the Event Hub',body:'Explore clubs and events happening across MIT ADT University.',time:'1 week ago',kind:'system'},
];
export const announcements=[
 {id:'a1',title:'TechFest volunteers needed',body:'Members interested in volunteering for TechFest 2026 can share their names with the core team.',date:'October 8, 2026'},
 {id:'a2',title:'Weekly coding session moved',body:'This week’s coding session moves to Thursday, 4:00 PM in Lab 3.',date:'October 5, 2026'},
];
export interface Registration{id:string;student:string;email:string;event:string;registeredOn:string}
export const registrations:Registration[]=[
 {id:'r1',student:'Aarav Sharma',email:'aarav.s@example.edu',event:'TechFest 2026',registeredOn:'Oct 2, 2026'},
 {id:'r2',student:'Diya Patil',email:'diya.p@example.edu',event:'TechFest 2026',registeredOn:'Oct 3, 2026'},
 {id:'r3',student:'Rohan Kulkarni',email:'rohan.k@example.edu',event:'TechFest 2026',registeredOn:'Oct 4, 2026'},
 {id:'r4',student:'Sneha Joshi',email:'sneha.j@example.edu',event:'TechFest 2026',registeredOn:'Oct 6, 2026'},
];
export const pendingClubs=[
 {id:'p1',name:'Robotics & Drone Club',category:'Technology' as Category,representative:'Kunal Deshmukh',submitted:'Oct 6, 2026'},
 {id:'p2',name:'Literary Circle',category:'Cultural' as Category,representative:'Ananya Rao',submitted:'Oct 4, 2026'},
 {id:'p3',name:'Green Campus Initiative',category:'Community' as Category,representative:'Meera Iyer',submitted:'Oct 1, 2026'},
];
export const hubUsers=[
 {id:'u1',name:'Aarav Sharma',email:'aarav.s@example.edu',role:'Student',status:'Active'},
 {id:'u2',name:'Diya Patil',email:'diya.p@example.edu',role:'Student',status:'Active'},
 {id:'u3',name:'Kunal Deshmukh',email:'kunal.d@example.edu',role:'Club Representative',status:'Active'},
 {id:'u4',name:'Ananya Rao',email:'ananya.r@example.edu',role:'Club Representative',status:'Pending'},
 {id:'u5',name:'Rohan Kulkarni',email:'rohan.k@example.edu',role:'Student',status:'Active'},
];
export const participation=[{event:'TechFest 2026',registered:184,capacity:250},{event:'Rhythm Night',registered:212,capacity:300},{event:'Artistry: Creative Workshop',registered:46,capacity:60}];
export const adminStats={students:2480,clubs:clubs.length,events:events.length,registrations:participation.reduce((s,p)=>s+p.registered,0)};
