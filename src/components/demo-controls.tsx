import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useDemo } from '@/data/demo-store';
export function ConfirmAction({label,title,onConfirm,children,variant='outline'}:{label:string;title:string;onConfirm:()=>void;children?:ReactNode;variant?:'outline'|'default'|'ghost'}){
 const [open,setOpen]=useState(false);
 return <><Button size="sm" variant={variant} aria-label={label} onClick={()=>setOpen(true)}>{children??label}</Button><Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>Frontend demo only. This changes the visible sample data and resets when the page is refreshed.</DialogDescription></DialogHeader><div className="flex justify-end gap-3"><Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button><Button onClick={()=>{onConfirm();setOpen(false);}}>Confirm</Button></div></DialogContent></Dialog></>;
}
export function DemoJoin({id,event=false,className='mt-4'}:{id:string;event?:boolean;className?:string}){
 const demo=useDemo();const values=event?demo.registered:demo.joined;const done=values.includes(id);const [notice,setNotice]=useState<string|null>(null);
 const confirm=()=>{if(done)return; const added=event?demo.registerEvent(id):demo.joinClub(id); if(added)setNotice(event?'Registered for this event. This demo list resets when the page is refreshed.':'Joined this club. This demo list resets when the page is refreshed.');};
 const status=notice??(done?(event?'Already registered in this demo. Resets after refresh.':'Already joined in this demo. Resets after refresh.'):(event?'Demo only · Registration is kept for this visit only.':'Demo only · Membership is kept for this visit only.'));
 return <div className={className}><Button className="w-full" onClick={confirm} disabled={done}>{done?(event?'Registered · Demo':'Joined · Demo'):(event?'Register for Event':'Join Club')}</Button><p className="text-xs text-muted-foreground text-center mt-3" role="status">{status}</p></div>;
}
export function SearchRecords({value,onChange,label='Search records'}:{value:string;onChange:(v:string)=>void;label?:string}){return <input className="field mb-4 max-w-md" aria-label={label} placeholder={label} value={value} onChange={e=>onChange(e.target.value)} maxLength={100}/>;}
export function EmptyRecords(){return <p className="text-sm text-muted-foreground py-6 text-center">No matching demo records.</p>;}
