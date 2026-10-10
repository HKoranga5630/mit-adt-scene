import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useDemo } from '@/data/demo-store';
export function ConfirmAction({label,title,onConfirm,children,variant='outline'}:{label:string;title:string;onConfirm:()=>void;children?:ReactNode;variant?:'outline'|'default'|'ghost'}){
 const [open,setOpen]=useState(false);
 return <><Button size="sm" variant={variant} aria-label={label} onClick={()=>setOpen(true)}>{children??label}</Button><Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>Frontend demo only. This changes the visible sample data and resets when the page is refreshed.</DialogDescription></DialogHeader><div className="flex justify-end gap-3"><Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button><Button onClick={()=>{onConfirm();setOpen(false);}}>Confirm</Button></div></DialogContent></Dialog></>;
}
export function DemoJoin({id,event=false}:{id:string;event?:boolean}){
 const demo=useDemo();const values=event?demo.registered:demo.joined;const done=values.includes(id);
 return <div className="mt-4"><Button className="w-full" onClick={()=>{if(done)return; if(event)demo.setRegistered(v=>[...v,id]);else demo.setJoined(v=>[...v,id]);}} disabled={done}>{done?(event?'Registered · Demo':'Joined · Demo'):(event?'Register for Event':'Join Club')}</Button><p className="text-xs text-muted-foreground text-center mt-3" role="status">{done?'Added to your demo list. Resets after refresh.':'Demo only · No real registration or membership.'}</p></div>;
}
export function SearchRecords({value,onChange,label='Search records'}:{value:string;onChange:(v:string)=>void;label?:string}){return <input className="field mb-4 max-w-md" aria-label={label} placeholder={label} value={value} onChange={e=>onChange(e.target.value)} maxLength={100}/>;}
export function EmptyRecords(){return <p className="text-sm text-muted-foreground py-6 text-center">No matching demo records.</p>;}
