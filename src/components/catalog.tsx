import { useState } from 'react';
import { Search, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDemo } from '@/data/demo-store';
import { ClubCard, EventCard } from '@/components/hub-cards';
export function Catalog({kind}:{kind:'clubs'|'events'}) {
 const { clubs, events } = useDemo();
 const [search,setSearch]=useState(''); const [category,setCategory]=useState('All');
 const items=kind==='clubs'?clubs:events;
 const categories=['All',...new Set(items.map(i=>i.category))];
 const filtered=items.filter(i=>(category==='All'||i.category===category)&&`${i.name} ${i.category} ${'club' in i?i.club:i.description}`.toLowerCase().includes(search.toLowerCase()));
 return <main><div className="page-intro"><div className="site-container"><p className="section-kicker">{kind==='clubs'?'Find your people':'Make room for memorable moments'}</p><h1>{kind==='clubs'?'Discover campus clubs':'Explore campus events'}</h1><p className="section-subtitle">{kind==='clubs'?'Your interests. Your community. Find a club that feels like you.':'From big ideas to unforgettable evenings, see what’s happening at MIT ADT.'}</p></div></div><section className="content-section site-container"><div className="catalog-toolbar"><div className="search-field"><Search/><input className="field" aria-label={`Search ${kind}`} placeholder={`Search ${kind}…`} value={search} onChange={e=>setSearch(e.target.value)}/></div><div className="filter-row" aria-label="Filter by category">{categories.map(c=><Button key={c} size="sm" variant={category===c?'default':'ghost'} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</Button>)}</div></div><p className="results-label">{filtered.length} {kind} · Sample campus collection</p>{filtered.length>0?<div className={kind==='clubs'?'club-grid':'event-grid'}>{kind==='clubs'?clubs.filter(c=>filtered.some(i=>i.id===c.id)).map(c=><ClubCard key={c.id} club={c}/>):events.filter(e=>filtered.some(i=>i.id===e.id)).map(e=><EventCard key={e.id} event={e}/>)}</div>:<div className="empty-state"><SearchX className="mx-auto mb-4" size={30}/><h2 className="text-lg font-semibold text-foreground">No {kind} found</h2><p className="text-sm mt-2">Try a different search or category.</p><Button variant="link" className="mt-3" onClick={()=>{setSearch('');setCategory('All');}}>Clear filters</Button></div>}</section></main>;
}
