import { createFileRoute } from '@tanstack/react-router';
import { Catalog } from '@/components/catalog';
import { pageHead } from '@/data/hub';
export const Route=createFileRoute('/events')({head:()=>pageHead('Campus Events','Discover upcoming MIT ADT University events, with dates, times, venues, and organizing clubs.'),component:()=> <Catalog kind="events"/>});
