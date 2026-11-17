import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClubLogo, EventCard } from '@/components/hub-cards';
import { clubById, pageHead } from '@/data/hub';
import { useDemo } from '@/data/demo-store';
import { DemoJoin } from '@/components/demo-controls';
export const Route = createFileRoute('/clubs_/$clubId')({
 loader: ({ params }) => { const club = clubById(params.clubId); if (!club) throw notFound(); return { club }; },
 head: ({ loaderData }) => loaderData ? pageHead(loaderData.club.name, loaderData.club.description) : { meta: [{ title: 'Club not found' }, { name: 'robots', content: 'noindex' }] },
 notFoundComponent: ClubNotFound,
 component: ClubDetails,
});
function ClubNotFound() { return <div className="site-container py-20 text-center"><h1 className="dash-title">Club not found</h1><Button asChild className="mt-6"><Link to="/clubs">Back to clubs</Link></Button></div>; }
function ClubDetails() {
 const { club: loaded } = Route.useLoaderData();
 const { clubs, events } = useDemo();
 const club = clubs.find(c => c.id === loaded.id) ?? loaded;
 const clubEvents = events.filter(e => e.club === club.name);
 return <div className="site-container py-9 pb-16">
  <Link to="/clubs" className="text-sm text-muted-foreground inline-flex items-center gap-2 hover:text-primary"><ArrowLeft size={15} />All clubs</Link>
  <div className="detail-layout pt-6">
   <div className="dash-panel"><ClubLogo club={club}/><h1 className="dash-title">{club.name}</h1><span className="category-badge mt-3" data-category={club.category}>{club.category}</span><p className="mt-5 text-sm leading-7 text-muted-foreground">{club.about}</p><p className="mt-3 text-sm text-muted-foreground">{club.description}</p></div>
   <aside className="dash-panel"><p className="text-sm flex items-center gap-2 text-muted-foreground"><Users size={15} />{club.members} members</p><DemoJoin id={club.id} /></aside>
  </div>
  {clubEvents.length > 0 && <><h2 className="section-title mb-5">Events by this club</h2><div className="event-grid">{clubEvents.map(e => <EventCard key={e.id} event={e} />)}</div></>}
 </div>;
}
