import React from 'react'


export default function Sidebar({active,setActive}){
const NavItem = ({id,label})=> (
<button onClick={()=>setActive(id)} className={`flex items-center gap-3 w-full p-3 rounded-xl transition ${active===id? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white':'text-slate-700 hover:bg-slate-100'}`}>
<span className="font-medium">{label}</span>
</button>
)
return (
<aside className="w-64 sticky top-6 self-start shrink-0">
<div className="bg-white/90 rounded-2xl p-4 shadow-lg border border-gray-100">
<div className="flex items-center gap-3 mb-4">
<div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 grid place-items-center text-white font-bold">EL</div>
<div>
<div className="font-bold">EduLearn</div>
<div className="text-xs text-slate-500">Teacher Dashboard</div>
</div>
</div>
<nav className="flex flex-col gap-2">
<NavItem id="dashboard" label="Dashboard" />
<NavItem id="analytics" label="Analytics" />
<NavItem id="courses" label="Manage Courses" />
<NavItem id="students" label="Students" />
<NavItem id="profile" label="Profile" />
</nav>
</div>
</aside>
)
}