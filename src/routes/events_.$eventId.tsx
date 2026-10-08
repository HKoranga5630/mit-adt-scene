import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, CalendarDays, Clock3, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { eventById, clubByName, pageHead } from '@/data/hub';
export const Route = createFileRoute('/events_/$eventId')({
 loader: ({ params }) => { const event = eventById(params.eventId); if (!event) throw notFound(); return { event }; },
 head: ({ loaderData }) => loaderData ? pageHead(loaderData.event.name, loaderData.event.description) : { meta: [{ title: 'Event not found' }, { name: 'robots', content: 'noindex' }] },
 notFoundComponent: EventNotFound,
 component: EventDetails,
});
function EventNotFound() { return <div className="site-container py-20 text-center"><h1 className="dash-title">Event not found</h1><Button asChild className="mt-6"><Link to="/events">Back to events</Link></Button></div>; }
function EventDetails() {
 const { event } = Route.useLoaderData();
 const club = clubByName(event.club);
 return <div className="site-container py-9">
  <Link to="/events" className="text-sm text-muted-foreground inline-flex items-center gap-2 hover:text-primary"><ArrowLeft size={15} />All events</Link>
  <div className="detail-layout pt-6">
   <div><img src={event.image} alt={`${event.name} poster`} className="detail-hero-img" width={1024} height={768} /><span className="category-badge mt-6" data-category={event.category}>{event.category}</span><h1 className="dash-title mt-3">{event.name}</h1><p className="mt-4 text-sm leading-7 text-muted-foreground">{event.description}</p></div>
   <aside className="dash-panel">
    <p className="event-meta"><CalendarDays />{event.date}</p><p className="event-meta"><Clock3 />{event.time}</p><p className="event-meta"><MapPin />{event.venue}</p>
    <p className="event-meta"><Users />Organized by {club ? <Link to="/clubs/$clubId" params={{ clubId: club.id }} className="text-primary font-semibold">{event.club}</Link> : event.club}</p>
    <Button className="w-full mt-6" disabled>Register for Event</Button><p className="text-xs text-muted-foreground text-center mt-3">Registration will be available once accounts are connected.</p>
   </aside>
  </div>
 </div>;
}
