import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clubIcons, EventCard } from '@/components/hub-cards';
import { clubById, events, pageHead } from '@/data/hub';
export const Route = createFileRoute('/clubs_/$clubId')({
 loader: ({ params }) => { const club = clubById(params.clubId); if (!club) throw notFound(); return { club }; },
 head: ({ loaderData }) => loaderData ? pageHead(loaderData.club.name, loaderData.club.description) : { meta: [{ title: 'Club not found' }, { name: 'robots', content: 'noindex' }] },
 notFoundComponent: ClubNotFound,
 component: ClubDetails,
});
function ClubNotFound() { return <div className="site-container py-20 text-center"><h1 className="dash-title">Club not found</h1><Button asChild className="mt-6"><Link to="/clubs">Back to clubs</Link></Button></div>; }
function ClubDetails() {
 const { club } = Route.useLoaderData();
 const Icon = clubIcons[club.icon];
 const clubEvents = events.filter(e => e.club === club.name);
 return <div className="site-container py-9 pb-16">
  <Link to="/clubs" className="text-sm text-muted-foreground inline-flex items-center gap-2 hover:text-primary"><ArrowLeft size={15} />All clubs</Link>
  <div className="detail-layout pt-6">
   <div className="dash-panel"><div className="club-icon" data-tone={club.tone}><Icon size={30} strokeWidth={1.7} /></div><h1 className="dash-title">{club.name}</h1><span className="category-badge mt-3" data-category={club.category}>{club.category}</span><p className="mt-5 text-sm leading-7 text-muted-foreground">{club.about}</p><p className="mt-3 text-sm text-muted-foreground">{club.description}</p></div>
   <aside className="dash-panel"><p className="text-sm flex items-center gap-2 text-muted-foreground"><Users size={15} />{club.members} members</p><Button className="w-full mt-4" disabled>Join Club</Button><p className="text-xs text-muted-foreground text-center mt-3">Club membership will be available once accounts are connected.</p></aside>
  </div>
  {clubEvents.length > 0 && <><h2 className="section-title mb-5">Events by this club</h2><div className="event-grid">{clubEvents.map(e => <EventCard key={e.id} event={e} />)}</div></>}
 </div>;
}
