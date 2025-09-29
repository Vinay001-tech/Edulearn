import React from 'react'


export default function AnnouncementList({items}){
return (
<div className="space-y-3">
{items.map(a=> (
<div key={a.id} className="p-3 border rounded-lg border-gray-100">
<div className="flex justify-between"><div className="font-semibold">{a.title}</div><div className="text-xs text-slate-400">{new Date(a.time).toLocaleString()}</div></div>
<div className="text-sm text-slate-600 mt-2">{a.body}</div>
</div>
))}
</div>
)
}