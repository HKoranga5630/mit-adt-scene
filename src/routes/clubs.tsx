import { createFileRoute } from '@tanstack/react-router';
import { Catalog } from '@/components/catalog';
import { pageHead } from '@/data/hub';
export const Route=createFileRoute('/clubs')({head:()=>pageHead('Discover Clubs','Explore student-led technology, music, arts, sports, and community clubs at MIT ADT University.'),component:()=> <Catalog kind="clubs"/>});
