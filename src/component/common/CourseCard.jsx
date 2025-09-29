import React from 'react'


export default function CourseCard({c, onOpen, onDelete}){
return (
<div className="bg-white rounded-2xl p-4 shadow-lg">
<div className="flex justify-between items-start">
<div>
<div className="font-bold">{c.title}</div>
<div className="text-xs text-slate-400">{c.code}</div>
</div>
<div className="text-xs text-slate-500">{c.students} students</div>
</div>
<div className="mt-4 text-sm text-slate-500">Lessons: {c.lessons}</div>
<div className="mt-4 flex gap-2">
<button onClick={()=>onOpen(c)} className="px-3 py-2 rounded-lg bg-blue-500 text-white">Open</button>
<button onClick={()=>onDelete(c.id)} className="px-3 py-2 rounded-lg bg-red-50">Delete</button>
</div>
</div>
)
}