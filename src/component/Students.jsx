import React from 'react'


export default function Students({students, setStudents, setModal, search}){
const filtered = students.filter(s=> s.name.toLowerCase().includes(search.toLowerCase()));
const togglePresent = (id,v)=> setStudents(prev=> prev.map(p=> p.id===id? {...p,present:v}:p));
const removeStudent = id => setStudents(prev=> prev.filter(p=> p.id!==id));


const exportCSV = ()=>{
const rows = [['Name','Present','Progress'], ...students.map(s=>[s.name, s.present? 'Yes':'No', s.progress])];
const csv = rows.map(r=> r.map(c=> '"'+String(c).replace(/"/g,'""')+'"').join(',')).join('');

const blob = new Blob([csv], {type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='students.csv'; a.click(); URL.revokeObjectURL(url);
}


return (
<div>
<div className="card overflow-x-auto">
<table className="w-full text-left">
<thead><tr className="text-slate-500 text-sm"><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Progress</th><th className="p-3">Present</th><th className="p-3">Actions</th></tr></thead>
<tbody>
{filtered.map(s=> (
<tr key={s.id} className="border-t border-gray-100">
<td className="p-3 font-medium">{s.name}</td>
<td className="p-3 text-sm text-slate-500">{s.email||'-'}</td>
<td className="p-3"><div className="w-48"><div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div style={{width:`${s.progress}%`, background:'linear-gradient(90deg,var(--purple),var(--blue))'}} className="h-2 rounded-full"/></div><div className="text-xs text-slate-400 mt-1">{s.progress}%</div></div></td>
<td className="p-3"><input type="checkbox" checked={s.present} onChange={e=>togglePresent(s.id,e.target.checked)} /></td>
<td className="p-3"><div className="flex gap-2"><button className="px-2 py-1 rounded bg-slate-100" onClick={()=> setModal({title:'Edit Student', content:'(edit UI)'})}>Edit</button><button className="px-2 py-1 rounded bg-red-50" onClick={()=> removeStudent(s.id)}>Delete</button></div></td>
</tr>
))}
</tbody>
</table>
</div>
<div className="mt-4 flex gap-2">
<button className="px-3 py-2 rounded-lg bg-slate-100" onClick={()=> setStudents(s=> s.map(x=> ({...x,present:false})))}>Reset Attendance</button>
<button className="px-3 py-2 rounded-lg bg-blue-500 text-white" onClick={exportCSV}>Export CSV</button>
</div>
</div>
)
}