import React from 'react'


export default function Header({ search, setSearch, totalStudents }){
return (
<div className="mb-6 flex items-center justify-between">
<div className="flex items-center gap-4">
<input placeholder="Search students, announcements..." value={search} onChange={e=>setSearch(e.target.value)} className="w-96 p-3 rounded-xl border border-gray-200 bg-white shadow-sm" />
</div>
<div className="flex items-center gap-3">
<div className="text-sm text-slate-600">Total students: <strong>{totalStudents}</strong></div>
</div>
</div>
)
}